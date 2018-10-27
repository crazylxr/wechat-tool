const {
    Wechaty
} = require('wechaty') // import { Wechaty } from 'wechaty'
import resource from './resource'

const bot = Wechaty.instance() // Global Instance

bot
    .on('scan', scan)
    .on('login', login)
    .on('message', message)
    .start()


function scan(qrcode, status) {
    console.log(
        `Scan QR Code to login: ${status}\nhttps://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        qrcode
      )}`)
}

function login(user) {
    console.log(`User ${user} logined`)
}

async function message(msg) {
    const concat = msg.from();
    const content = msg.content();
    const room = msg.room();

    // console.log(concat.name())
    // if(concat.name() === '香ing') {
    //     concat.say("你是傻逼!");
    //     return;
    // }

    const roomTopic = await room.topic();

    // 如果调用 call:react 就返回 react 资料
    if (/call:(.*)/.test(content) && room && roomTopic === '前端桃园') {
        let keyroom = await bot.Room.find({
            topic: roomTopic
        })
        if (keyroom) {
            const r = /call:(.*)/.exec(content)[1];
            if(resource[r]) {
                await keyroom.say(resource[r], concat);
            }
        }
    }

    if (room) {
        console.log(`Room:${await room.topic()} Concact ${concat.name() }Content: ${content}`)
    }
}