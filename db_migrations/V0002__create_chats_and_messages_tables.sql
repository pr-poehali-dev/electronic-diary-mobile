CREATE TABLE IF NOT EXISTS t_p38457996_electronic_diary_mob.chats (
    id SERIAL PRIMARY KEY,
    user1_id INTEGER NOT NULL,
    user2_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user1_id, user2_id),
    CHECK (user1_id < user2_id)
);

CREATE TABLE IF NOT EXISTS t_p38457996_electronic_diary_mob.chat_messages (
    id SERIAL PRIMARY KEY,
    chat_id INTEGER NOT NULL REFERENCES t_p38457996_electronic_diary_mob.chats(id),
    sender_id INTEGER NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_chat_id ON t_p38457996_electronic_diary_mob.chat_messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_sender ON t_p38457996_electronic_diary_mob.chat_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_chats_user1 ON t_p38457996_electronic_diary_mob.chats(user1_id);
CREATE INDEX IF NOT EXISTS idx_chats_user2 ON t_p38457996_electronic_diary_mob.chats(user2_id);
