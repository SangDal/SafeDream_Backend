import { db } from '../db/database.js';
import bcrypt from 'bcrypt';

export async function getAll() {
    return db.execute('select userid, username, guardianHp, hp from user').then((result) => result[0]);
}

export async function getById(id) {
    return db.query('select userid, username, guardianHp, hp from user WHERE userid = ?', [id]).then((result) => result[0][0])
}

export async function createUser(userid, username, password, guardianHp,  hp) {
    const query = 'INSERT INTO user (userid, username, password, guardianHp, hp) VALUES (?, ?, ?, ?, ?)';
    const values = [userid, username, password, guardianHp,  hp];

    await db.query(query, values);
}

export async function update(userid, username, password ,guardianHp, hp) {
    
    // 해싱할 때의 라운드 수. 10은 일반적으로 권장되는 값입니다.
    const saltRounds = 12;
    
    // bcrypt.hash 함수는 Promise를 반환하므로, 비밀번호 해싱이 완료될 때까지 기다려야 합니다.
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const query = 'UPDATE user SET username = ?, password = ?, guardianHp = ?, hp = ? WHERE userid = ?';
    const values = [username, hashedPassword, guardianHp, hp, userid];
    await db.query(query, values);
}

export async function remove(userid) {
    const values = [userid];

    
    // 외래키 때문에 게시물 먼저 삭제해야함.
    const board_del = 'delete from board where userid=?';
    await db.query(board_del, values);

    const query = 'DELETE FROM user WHERE userid = ?';
    await db.query(query, values);
}

export async function deleteboard(post_id){
    return db.execute('delete from board where post_id=?', [post_id])
    .then((result) => console.log(result[0]))
}
