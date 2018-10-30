const {
    Wechaty
} = require('wechaty') // import { Wechaty } from 'wechaty'
import resource from './resource'
import welcome from './welcome'
import {
    roomTopic as staticTopic,
    autoRoomTopic
} from './config'

const bot = Wechaty.instance() // Global Instance

bot
    .on('scan', scan)
    .on('login', login)
    .on('room-join', roomJoin)
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

/**
 * @description 消息处理函数
 * @param {} msg 
 */
async function message(msg) {
    const concact = msg.from()
    const content = msg.text()
    const room = msg.room()

    if (room) {
        const roomTopic = await room.topic()

        // 管理群，根据关键词自动回复
        if (/call:(.*)/.test(content) && room && roomTopic === staticTopic) {
            let keyroom = await bot.Room.find({
                topic: roomTopic
            })
            if (keyroom) {
                const r = /call:(.*)/.exec(content)[1]
                if (resource[r]) {
                    await keyroom.say(resource[r], concact)
                }
            }
        }
    }

    // 根据‘加群’自动拉人
    if (/加群/.test(content) && !room) {
        const keyroom = await bot.Room.find({
            topic: autoRoomTopic
        })
        console.log(concact.name())
        console.log(keyroom.topic())
        try {
            console.log(await keyroom.add(concact)) 
        } catch (error) {
            console.log(error)
        }
        await keyroom.say(welcome.data, concact)
    }


    if (room) {
        console.log(`Room:${await room.topic()} Concact ${concact.name() }Content: ${content}`)
    }
}

/**
 * @description 有人加入群聊的事件
 * @param {*} room
 * @param {被邀请人的列表} inviteeList 
 * @param {邀请人} inviter
 */
async function roomJoin(room, inviteeList, inviter) {
    const roomTopic = await room.topic();
    if (roomTopic === staticTopic) {
        inviteeList.forEach(async c => {
            await room.say(welcome.data, c)
        });
    }
}