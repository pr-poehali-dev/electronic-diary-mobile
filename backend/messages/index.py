"""
Чат-функция для электронного дневника.
GET  ?action=list&user_id=X          — список чатов пользователя
GET  ?action=messages&chat_id=X      — сообщения чата
GET  ?action=find_user&user_id=X     — найти пользователя по ID
POST ?action=send                    — отправить сообщение {from_id, to_id, text}
POST ?action=read&chat_id=X          — пометить сообщения прочитанными {user_id}
"""
import json
import os
import psycopg2

SCHEMA = 't_p38457996_electronic_diary_mob'

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
}

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def ok(data):
    return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(data, default=str)}

def err(code, msg):
    return {'statusCode': code, 'headers': CORS, 'body': json.dumps({'error': msg})}

def get_or_create_chat(cur, user1_id, user2_id):
    a, b = min(user1_id, user2_id), max(user1_id, user2_id)
    cur.execute(
        f"SELECT id FROM {SCHEMA}.chats WHERE user1_id=%s AND user2_id=%s",
        (a, b)
    )
    row = cur.fetchone()
    if row:
        return row[0]
    cur.execute(
        f"INSERT INTO {SCHEMA}.chats (user1_id, user2_id) VALUES (%s, %s) RETURNING id",
        (a, b)
    )
    return cur.fetchone()[0]

def handler(event: dict, context) -> dict:
    """Обработчик чатов и сообщений."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    params = event.get('queryStringParameters') or {}
    action = params.get('action', '')
    method = event.get('httpMethod', 'GET').upper()

    conn = get_conn()
    cur = conn.cursor()

    try:
        # Список чатов пользователя
        if action == 'list' and method == 'GET':
            user_id = int(params.get('user_id', 0))
            if not user_id:
                return err(400, 'user_id required')

            cur.execute(f"""
                SELECT
                    c.id,
                    CASE WHEN c.user1_id = %s THEN c.user2_id ELSE c.user1_id END AS partner_id,
                    u.name AS partner_name,
                    u.email AS partner_email,
                    (SELECT text FROM {SCHEMA}.chat_messages WHERE chat_id = c.id ORDER BY created_at DESC LIMIT 1) AS last_text,
                    (SELECT created_at FROM {SCHEMA}.chat_messages WHERE chat_id = c.id ORDER BY created_at DESC LIMIT 1) AS last_time,
                    (SELECT COUNT(*) FROM {SCHEMA}.chat_messages WHERE chat_id = c.id AND sender_id != %s AND is_read = false) AS unread
                FROM {SCHEMA}.chats c
                JOIN {SCHEMA}.users u ON u.id = CASE WHEN c.user1_id = %s THEN c.user2_id ELSE c.user1_id END
                WHERE c.user1_id = %s OR c.user2_id = %s
                ORDER BY last_time DESC NULLS LAST
            """, (user_id, user_id, user_id, user_id, user_id))

            rows = cur.fetchall()
            chats = []
            for r in rows:
                chats.append({
                    'chat_id': r[0],
                    'partner_id': r[1],
                    'partner_name': r[2] or f'Пользователь #{r[1]}',
                    'partner_email': r[3],
                    'last_text': r[4] or '',
                    'last_time': r[5],
                    'unread': int(r[6]),
                })
            return ok({'chats': chats})

        # Сообщения конкретного чата
        elif action == 'messages' and method == 'GET':
            chat_id = int(params.get('chat_id', 0))
            if not chat_id:
                return err(400, 'chat_id required')

            cur.execute(f"""
                SELECT m.id, m.sender_id, u.name, m.text, m.created_at, m.is_read
                FROM {SCHEMA}.chat_messages m
                JOIN {SCHEMA}.users u ON u.id = m.sender_id
                WHERE m.chat_id = %s
                ORDER BY m.created_at ASC
            """, (chat_id,))

            rows = cur.fetchall()
            messages = [{'id': r[0], 'sender_id': r[1], 'sender_name': r[2] or f'#{r[1]}', 'text': r[3], 'time': r[4], 'is_read': r[5]} for r in rows]
            return ok({'messages': messages})

        # Найти пользователя по ID
        elif action == 'find_user' and method == 'GET':
            user_id = int(params.get('user_id', 0))
            if not user_id:
                return err(400, 'user_id required')
            cur.execute(f"SELECT id, name, email FROM {SCHEMA}.users WHERE id = %s", (user_id,))
            row = cur.fetchone()
            if not row:
                return err(404, 'Пользователь не найден')
            return ok({'id': row[0], 'name': row[1] or f'Пользователь #{row[0]}', 'email': row[2]})

        # Отправить сообщение
        elif action == 'send' and method == 'POST':
            body = json.loads(event.get('body') or '{}')
            from_id = int(body.get('from_id', 0))
            to_id = int(body.get('to_id', 0))
            text = (body.get('text') or '').strip()

            if not from_id or not to_id or not text:
                return err(400, 'from_id, to_id, text required')
            if from_id == to_id:
                return err(400, 'Нельзя писать самому себе')

            chat_id = get_or_create_chat(cur, from_id, to_id)
            cur.execute(
                f"INSERT INTO {SCHEMA}.chat_messages (chat_id, sender_id, text) VALUES (%s, %s, %s) RETURNING id, created_at",
                (chat_id, from_id, text)
            )
            row = cur.fetchone()
            conn.commit()
            return ok({'message_id': row[0], 'chat_id': chat_id, 'created_at': row[1]})

        # Пометить прочитанными
        elif action == 'read' and method == 'POST':
            chat_id = int(params.get('chat_id', 0))
            body = json.loads(event.get('body') or '{}')
            user_id = int(body.get('user_id', 0))
            if not chat_id or not user_id:
                return err(400, 'chat_id and user_id required')
            cur.execute(
                f"UPDATE {SCHEMA}.chat_messages SET is_read=true WHERE chat_id=%s AND sender_id!=%s AND is_read=false",
                (chat_id, user_id)
            )
            conn.commit()
            return ok({'ok': True})

        else:
            return err(404, f'Unknown action: {action}')

    finally:
        cur.close()
        conn.close()
