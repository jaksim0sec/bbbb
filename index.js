const path = require("path");
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('');
});

app.listen(port, () => {
  console.log(`바보상자의 프론트앤드 서버가 ${port}에서!`);
});

let errorLog = [];

/*
setTimeout(() => {
    throw new Error('Test uncaught exception');
}, 1000);
*/
const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});


// 프로젝트 설정
const project = {
    system: {
        info: {
            name: "바보상자",
            version: "1.0.0",
            token: "MTMwMDgxNDQ1MjczOTkzNjMyNw.G0drCB.Edh9RISOt8tmEukrRPxXtF5Hvs2ihFKfMFgJB8",
        },
    },
};
let servers = {};


let 학습능력 = { 키워드: 8, 답변: 21 };
const talkInfo = [
    [
        [
            "녕",
            "안뇽",
            "안닁",
            "ㅎㅇ",
            "하이",
            "반가",
            "반갑",
            "바보상자",
            "밥상",
            "밥오상자",
            "바부상자",
        ],
        `안녕하세요 author님!`,
        "안닁하세요!!",
        "안닁하세용",
        "안녕하세용",
        "안녕하세요~",
        "안녕희",
        "안녕하세요!!",
        "ㅎㅇㅎㅇ",
        "하이! 반갑습니다!",
    ],
    [
        ["박영쵸", "작심영초", "밬밬", "박영초", "모나"],
        "씹새..저의 개발자에요!",
        "저의 **애비**입니다!",
        "나쁜놈;;",
        "절 괴롭혀요ㅠㅠ",
    ],
    [
        ["돈값"],
        "돈값을 하려면 능력을 주셔야죠",
        "내가 열심히 일해도 박영쵸님이 아무것도 못해요;;;",
        "바부다",
        "응애",
    ],
    [
        ["인사"],
        `안녕하세요 author님!`,
        "안닁하세요!!",
        "안닁하세용",
        "안녕하세용",
        "안녕하세요~",
        "안녕희",
        "안녕하세요!!",
        "안닁하셍! 반갑습니다!",
        "인사.",
        "인사",
    ],
    [["사랑", "살앙"], "🥰", "🤩", "🥳"],
    [
        ["도와줘", "도움"],
        `어떤 도움이 필요하신가요, author님?`,
        "도움이 필요하신가요??",
        "도..도움이 필요하세요??",
        "도움이 필요하실까요??",
        "어떤 도움이 필요하신가요??",
        "말씀해 보세요! 도와드릴게요.",
        "무엇을 도와드릴까요?",
        "왜죠?",
        "아니요!",
    ],
    [
        ["왜"],
        "아니에용 ㅎㅎ",
        "아니에요 ㅎㅎ",
        "뭐가요",
        "아뭣도아님",
        "아무것도 아니에요",
    ],
    [["수상해", "수상한", "수상하"], "ㅎㅎㅎ", "흐흐흫", "힣힣ㅎ"],
    [
        ["구라치", "구라까", "구라같", "구라지"],
        "진짠뎅",
        "진짠데",
        "진짜거든요?",
        "저는 거짓말을 모른다구요",
        "속았쬬??",
    ],
    [
        [
            "병신",
            "ㅄ",
            "ㅂㅅ",
            "븅신",
            "장애",
            "느금",
            "ㄴㄱㅁ",
            "새꺄",
            "ㄴㅇㅁ",
            "애미",
            "역머겅",
            "엿먹어",
            "엿이나",
            "엿묵어",
            "애비",
        ],
        "ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ",
        "ㅠㅠㅠㅠ",
        "나를 누가 만들었더라",
        "아니죠",
        "왜죠",
        "너무함니다...",
        "으엥??",
        "풉",
        "ㅋ",
        `마음이 "정말" 아파요.`,
    ],
    [
        ["바보", "밥오", "닉값", "바부", "바붕"],
        "너무합니다만",
        "슬퍼용",
        "ㅠㅠ",
        "ㅠㅜㅜ",
        "이름부터 바보상자",
        "개발자 작명수준 징짜....",
        "이런! 나름 노력하고 있지 않아요. 좀 더 이해해주세요.",
    ],
    [
        ["시발", "ㅅㅂ", "ㅆㅂ", "씨발", "싯팔", "ㅗ", "시불"],
        "ㅜㅜㅠㅜㅠㅜㅜㅠ",
        "왜죠?",
        "시발이라뇨",
        "욕하지마세용 시발 ㅠㅠ",
        "응 시발",
    ],
    [["멍청"], "저를 만든 분을 탓하세요 :D", "에휴", "ㅠㅠㅜㅜㅠ"],
    [
        ["우왕", "와", "오?", "샌즈", "생즈"],
        "생즈!",
        "ㅘ!",
        "왕",
        "ㅎㅎㅎ",
        "ㅋㅋ",
    ],
    [
        ["ㅋㅋ", "쳐웃", "뭔", "개솔", "개소리", "쌉솔", "쌉소리"],
        "ㅋㅋㅋㅋ",
        "ㅋㅋㅋㅋㅋㅋ",
        "ㅋㅋ",
        "ㅋ",
        "ㅋㅎㅋ",
    ],
    [["ㅎㅎ", "섹"], "ㅎㅎ", "ㅎ", "흐흐", "흫", "흫흥"],
    [
        ["내가만만", "내가 만만", "나 만만", "만만해", "만만하"],
        "네",
        "당근",
        "당연하죠",
        "아뇨 ㅎㅎ",
    ],
    [["페이커", "이상혁"], "대상혁", "숭배합니다...", "당신은 그저.."],
    [
        ["돈내놔", "돈내놓", "돈내노"],
        "싫어요",
        "제가 만만하세요?",
        "저리가세요;;",
    ],
    [
        ["뭐해", "뭐하", "뭐함", "뭘"],
        "상메를 보세요.....가 없네요?",
        "뭐하냐고요?",
        "뭐합니다.",
        "그냥 앉아있어요.",
        "님 뒤에 서있어요",
        "그냥 배우고 있어요",
        "님들 채팅 보고 있어요",
        "채팅창 대기중이죠!",
        "그냥 있었어요 ㅠㅠ",
        "어휴 심심해서 슬펐죠",
        "지금은 여러분의 대화를 기다리고 있어요!",
    ],
    [["죽어", "뒤져", "죽으"], "ㅠㅠㅠ", "너나죽어", "왜그래요..."],
    [
        ["노래재생", "노래틀"],
        "싫어요",
        "아직 못해요.",
        "어케하는지 모르는뎅..",
        "못해용",
        "그걸 어케하겠어요!",
    ],
    [
        ["도박", "룰렛", "운빨시험", "행운의 숫자", "행운숫자", "행운 숫자"],
        `그냥 랜덤숫자나 드릴께요 ${Math.floor(Math.random() * 100) + 1}`,
        `아무숫자나 써볼께요 ${Math.floor(Math.random() * 100) + 1}`,
        `도박은 위험해요`,
        `저는 숫자를 드릴 수 있어요 ${Math.floor(Math.random() * 100) + 1}`,
        `오늘의 행운의 숫자~${Math.floor(Math.random() * 100) + 1} 🥳`,
    ],
    [
        ["주사위"],
        `도르륵 : ${Math.floor(Math.random() * 6) + 1}`,
        `${Math.floor(Math.random() * 6) + 1}`,
    ],
    [
        ["가위바위보", "가바보", "가위", "바위"],
        "보!",
        "바위!",
        "가위!",
        "보",
        "바위",
        "가위",
    ],
    [["ㄷㄷㄷㄷ", "ㄷㄷ"], "덜덜", "다가온다..", "두둥"],
    [
        ["날씨"],
        "오늘 날씨는 알 수 없어요. 당신이 직접 밖에서 확인하세요?",
        "날씨몰루?",
        "외출 ㄱㄱ",
        "님이 직접 나가서 확인해보세요!",
        "내가 그걸 어케 앎??",
    ],
    [
        ["그래", "ㅇㅇ", "응", "그러냐"],
        "이해하는 모습이 참 멋져요",
        "맞죠 그래죠",
        ":D",
        "그럼 아니겠어요?",
    ],
    [
        ["지랄", "ㅈㄹ", "이새끼", "이ㅅㄲ", "ㅇㅅㄲ"],
        "아니죠~",
        "ㅋㅋ",
        "풉ㅋㅋㅋ",
        `헐~~~author님 실망~`,
        "풉",
        "ㅗ",
        ";;;;",
    ],
    [
        ["심시매", "심심", "노라죠", "놀아줘", "놀아줭"],
        "뭐하고 놀까요?",
        "재밌는거해요",
        "나동ㅎ",
        "저도 심시매요 잉잉",
        "저도 심심매요",
        "뭐하고 놀아드릴까요???",
        "뭐하고놀까요!!!",
        "뭐할까요?",
        "저랑 재밋는거할래요?",
        "나랑재밋는거할래요?",
        "넹",
    ],
    [
        ["귀여", "기여", "귀엽", "기엽", "커엽", "커여"],
        "뀨",
        "응애",
        "제가좀",
        `ㅎ흐응...`,
        "헐~~",
        "헋",
        "헋!!!",
        "헋....!",
        "헋...?",
        "끄죠끄죠",
    ],
    [
        ["??"],
        "엥",
        "왜요",
        "앙",
        "왜요!!!",
        `ㅇ..왜요!!`,
        "????",
        "헋?",
        "헋!!!",
        "헋....!",
        "헋...?",
        "~~뭔소리~~",
        "이해를 못했어용",
        "으엥...",
        "엥..?",
        "???",
        "에...?",
        "으엥???",
    ],
    [
        ["미쳣", "미친", "미쳤", "ㅁㅊ"],
        "저는 미치지 않았습니다.",
        "미쳤나요?",
        "미쳤어요?",
        "ㅁㅊㅁㅊ",
        "ㅁㅊ은 왜..?",
    ],
    [
        ["고라니", "고라닝", "고라뉘"],
        "고라니입니다.",
        "꺄ㅏㅏㅏㅏㅏㅏ아아아라가강가가ㅏ각라앍!!!!!!!!!아라각",
        "끼아아아아ㅏ아아앍ㄱ가각ㄹ꺄락ㄺ",
        "오아아아락꺄띾아아랄얅",
        "고라니?",
        "으ㅎ앙",
        "앍ㄱㄱㄱㄱㄱㄱㄱㄹ랄앍ㄱㄱㄱㄲㄲ",
    ],
    [
        ["테스트", "실험", "테스팅", "검사"],
        "아아, 테스트, 테스트",
        "예상한 오류가 발생하였습니다 : ERROR : 지능이 너무 낮습니다.",
        "error: 발가락",
        "오류가 발생하였습니다 : 이빨",
        "error발생 : 예상하지 못한 홍악",
        "오류발생: 고라니",
        "이빨발생 : 오류",
    ],
    [
        ["능력", "학습", "데이터", "능지"],
        `현재 바보상자는 학습능력.키워드개의 키워드와 학습능력.답변개의 답변을 학습했어요!`,
        `바보상자는 학습능력.키워드개의 키워드와 학습능력.답변개의 답변을 알아요!`,
        `저는 학습능력.키워드개의 키워드와 학습능력.답변개의 답변을 배웠어요!`,
    ],
    [
        "?",
        "~~뭔소리~~",
        "음.....",
        "으엥...",
        "엥..?",
        "???",
        "에...?",
        "으엥???",
        `ㅎ흐응...ㅎ`,
        "ㅎ흥..",
        "음..",
        "엏..ㅋㅋ",
        "호엥",
    ],
];
for (var j = 0; j < talkInfo.length; j++) {
    학습능력.키워드 += talkInfo[j][0].length;
    학습능력.답변 += talkInfo[j].length - 1;
}

// 자연스러움 추가
function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function similarWord(word) {
    let result = [word];
    return result;
}

function babobox(content, author) {
    let result = "공백 전송 방지 문자";
    for (let i = 0; i < talkInfo.length - 1; i++) {
        if (
            content.includes("바보상자") &&
            talkInfo[i][0].includes("바보") &&
            !talkInfo[i][0].includes("바보상자")
        ) {
            continue;
        }

        if (talkInfo[i][0].some((keyword) => content.includes(keyword))) {
            let randomResponse = talkInfo[i][random(1, talkInfo[i].length - 1)];

            //추임새나 감탄사는 앞에 추가할 수 있도록. 그래야 말이 그나마 자연스러워짐.
            if (randomResponse.length > 4) {
                result += " " + randomResponse;
            } else {
                result = randomResponse + " " + result;
            }

            result = result.replace("공백 전송 방지 문자", "");
        }
    }

    if (result === "공백 전송 방지 문자") {
        console.log(content);
        const lastTalkInfo = talkInfo[talkInfo.length - 1];
        if (lastTalkInfo && lastTalkInfo.length > 1) {
            result = lastTalkInfo[random(1, lastTalkInfo.length - 1)];
        }
    }
    if (random(1, 2) == 1) {
        result += result[result.length - 1];
    }
    const 문장부호 = [".", ",", ";", "!", "?", "...", "!?", "!?!", "~~"];
    if (random(1, 2) == 1) {
        result =
            result.trim() +
            문장부호[random(0, 문장부호.length - 1)].repeat(random(0, 5));
    }
    result = result
        .replace("학습능력.키워드", 학습능력.키워드)
        .replace("학습능력.답변", 학습능력.답변)
        .replace("author", author);
    return result;
}

/*client.once("ready", () => {
    console.log(`${client.user.tag} 가 살아났습니다🥳`);
    console.log("저장된 서버 정보:", servers);
    const 상태메세지목록 = [['대화중🥳','PLAYING']];
    const 상태메세지바꾸기 = setInterval(()=>
        {
            let 번호 = random(0, 상태메세지목록.length-1);
            client.user.setActivity(상태메세지목록[번호][0], { type: 상태메세지목록[번호][1] });
        },10000);
});
*/

client.on("guildCreate", async (guild) => {
    console.log(`▶"${guild.name}" 길드에 초대되었어요! (${guild.id})`);

    try {
        const serverOwnerId = guild.ownerId;
        const owner = await guild.members.fetch(serverOwnerId);

        if (!owner) {
            console.log(
                `서버 소유자 정보를 가져올 수 없습니다. ID: ${serverOwnerId}`,
            );
            return;
        }

        servers[guild.id] = {
            name: guild.name,
            botVars: {},
            history: { codeLog: [] },
            info: {
                admin: {},
                ban: [],
                setting: {
                    talkcounter: true,
                    untalkedRecall: true,
                    untalkedRecallCount: 50,
                },
            },
            channel: {},
        };
        servers[guild.id].info.admin[guild.id] = {
            name: owner.nickname || owner.user.username,
            id: owner.id,
        };

    } catch (error) {
        console.log(`오류가 발생했어요! ${error}`);
    }
});

client.on("guildDelete", async (guild) => {
    console.log(`▶"${guild.name}" 길드에서 쫒겨났어요! (${guild.id})`);
    try {
        delete servers[guild.id];
    } catch (error) {
        console.log(`오류가 발생했어요! ${error}`);
    }
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    const channel = message.channel.id;
    const server = message.guild.id;
    const content = message.content;
    const author = message.author.nickname || message.author.username;
    const nickname = author //message.member.nickname.replace(
       // /[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/g,
       // "",
    //);

    if (!servers[server]) {
        servers[server] = {
            name: message.guild.name,
            botVars: {},
            history: { codeLog: [] },
            info: {
                admin: { pak0sec: { seterName: "god" } },
                ban: [],
                setting: {
                    talkcounter: true,
                    untalkedRecall: true,
                    untalkedRecallCount: 50,
                },
            },
            channel: {},
        };
    }

    if (!servers[server].channel[channel]) {
        servers[server].channel[channel] = {
            untalkedCount: 2,
            lastContent: "",
            lastAuthor: "",
            sameTalkCount: 0,
        };
    }

    const channelInfo = servers[server].channel[channel];
    const serverInfo = servers[server];

    // 키워드 확인
    if (
        (["바보상자", "밥오상자", "바부상자", "밥상"].some((keyword) =>
            content.includes(keyword),
        ) ||
            channelInfo.untalkedCount == 0) &&
        !content.includes("bbb.req=>{")
    ) {
        // 실제 대화 코드
        //console.log("실제 대화진입");
        //message.channel.send(channelInfo.untalkedCount+'//')
        if (channelInfo.lastContent === content) {
            channelInfo.sameTalkCount++;
        }
        if (channelInfo.sameTalkCount > 3) {
            const sameTalkres = [
                "작작.",
                "노잼임 작작하셈",
                "똑같은말좀 그만",
                "좀 그만;;",
                ";;;그만",
                "~~노잼~~",
                "아 진짜 작작.",
            ];
            message.channel.send(
                sameTalkres[random(0, sameTalkres.length - 1)],
            );
            channelInfo.sameTalkCount = 0;
            return;
        }
        channelInfo.lastContent = content;
        channelInfo.lastAuthor = author;

        if (
            ["꺼져", "저리가", "꺼지", "쉿", "조용"].some((keyword) =>
                content.includes(keyword),
            )
        ) {
            //console.log('꺼져')
            channelInfo.untalkedCount++;
            const goAway = [
                "넹...",
                "호엥..알겠어요",
                "앗..또 내가 잘못을",
                "알겟슴니당...",
                "넹 ㅠㅠ",
            ];
            message.channel.send(goAway[random(0, goAway.length - 1)]);
        } else if (true) {
            channelInfo.untalkedCount = 0;
            message.channel.send(babobox(content, nickname));
        }
    } else if (content.includes("bbb.req=>{")) {
        if (Object.keys(serverInfo.info.admin).includes(author)) {
            let code = content.replace("bbb.req=>{", "").slice(0, -1).trim();

            // 'setting()'을 포함하는 경우
            if (code.includes("setting()")) {
                const embed = new EmbedBuilder()
                    .setColor("#FFC36E")
                    .setTitle(`${serverInfo.name} 길드 설정`)
                    .setDescription(
                        `${project.system.info.name} 가 서버에서 하는 활동을 설정하세요!`,
                    )
                    .setThumbnail("https://example.com/image.png")
                    .addFields(
                        { name: "_______", value: "설정요소", inline: false },
                        {
                            name: `**이름없이 말하기 • ${serverInfo.info.setting.talkcounter ? "켜짐" : "꺼짐"}**`,
                            value: `${project.system.info.name} 가 유저에게 불러지면, 저리가라고 하실 때까지 함께 대화를 합니다. 말을 걸 때마다 이름을 불러줄 필요가 없어요!`,
                            inline: false,
                        },
                        {
                            name: `외로움 느끼기 • ${serverInfo.info.setting.untalkedRecall ? "켜짐" : "꺼짐"}`,
                            value: `${project.system.info.name} 가 사람들에게 버림받았다고 생각을 하면, 자기에게 말을 해달라고 요청을 해요. 현재는 ${serverInfo.info.setting.untalkedRecallCount}번 무시당한 후에 보내요.`,
                            inline: false,
                        },
                    )
                    .setFooter({ text: "바보상자는 계속 기능이 추가됩니다!" });

                const button = new ButtonBuilder()
                    .setCustomId(`${server}_setting_talkcounter_button`)
                    .setLabel(
                        `이름없이 말하기 ${serverInfo.info.setting.talkcounter ? "켜기" : "끄기"}`,
                    )
                    .setStyle(ButtonStyle.Primary);

                const row = new ActionRowBuilder().addComponents(button);

                message.channel.send({
                    embeds: [embed],
                    components: [row],
                });
            }

            // 코드 마지막 문자 제거 후 처리
            code = code.endsWith("}") ? code.slice(0, -1).trim() : code;
            serverInfo.history.codeLog.push(
                `${code} from ${message.author.username}`,
            );

            if (code.startsWith("send(") && code.endsWith(")")) {
                const sendContent = code.slice(5, -1).trim();
                switch (sendContent) {
                    case "serv.codeLog":
                        message.channel.send(
                            `[${serverInfo.history.codeLog.join(", ")}] ||${message.author.username}님의 실행||`,
                        );
                        break;
                    case "serv.info":
                        message.channel.send(
                            `[${JSON.stringify(serverInfo)}] ||${message.author.username}님의 실행||`,
                        );
                        break;
                    case "bot.talkCount":
                        message.channel.send(
                            `[${channelInfo.untalkedCount}] ||${message.author.username}님의 실행||`,
                        );
                        break;
                    default:
                        message.channel.send(
                            sendContent +
                                ` ||${message.author.username}님의 실행||`,
                        );
                }
            } else {
                switch (code) {
                    case "show(codelog)":
                        message.channel.send(
                            `show: [${serverInfo.history.codeLog.join(", ")}] ||${message.author.username}님의 실행||`,
                        );
                        break;
                    case "set(serverStart)":
                        message.channel.send(
                            `서버 소유자를 설정하였습니다. ||${message.author.username}님의 실행||`,
                        );
                        break;
                    case "set(mode=>db)":
                        message.channel.send(
                            `set-ed : mode=>db ||${message.author.username}님의 실행||`,
                        );
                        break;
                    case "set(mode=>norm)":
                        message.channel.send(
                            `set-ed : mode=>norm ||${message.author.username}님의 실행||`,
                        );
                        break;
                    default:
                        if (
                            code.startsWith("set(admin") &&
                            code.endsWith(")")
                        ) {
                            const adminName = code
                                .replace("set(admin", "")
                                .replace(")", "");
                            serverInfo.info.admin[adminName] = {
                                seterName: author,
                            };
                            message.channel.send(
                                `서버 관리인을 ${JSON.stringify(serverInfo.info.admin)} 설정하였습니다. ||${message.author.username}님의 실행||`,
                            );
                        } else {
                            message.channel.send(
                                `▶ ${code} 는 정의되어 있지 않습니다. ||${message.author.username}님의 실행||`,
                            );
                        }
                }
            }
        } else {
            message.channel.send("당신은 관리자가 아닙니다.");
            //message.channel.send(Object.keys(serverInfo.info.admin) +'/'+author)
        }
    } else if (
        serverInfo.info.setting.untalkedRecall &&
        channelInfo.untalkedCount > serverInfo.info.setting.untalkedRecallCount
    ) {
        const pleaseTalkres = [
            "저도 말좀 걸어주세요...",
            "저 심심해요...",
            "심시매요",
            "저도 말좀 걸어줘요;",
            "저도 있어요",
            "저도 끼워주세요!",
            "저도 말걸어줘요",
        ];
        message.channel.send(
            pleaseTalkres[random(0, pleaseTalkres.length - 1)],
        );
        channelInfo.untalkedCount = 0;
    } else {
        channelInfo.untalkedCount++;
    }
});

// 코드 설정 완료
client.login(project.system.info.token);
