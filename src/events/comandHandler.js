const client = global.client;
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");
const ms = require('ms');

const iltifatlar = [

    "Oha bu çocuk Türk müüüüüüüüüüüü?",
    "dur beynimi çıkarayım, eşit şartlarda konuşalım",
    "gitsen tek kaybım mal kaybı olur hahaha",
    "bunun adı kalp güzelim. Tersten okuduğun gibi plak değil ki sürekli sende takılı kalsın.",
    "kafamı yaşasan kafana sıkarsın",
    "sanırım seni getiren leyleğin bıraktığı izdi, kuş beyinli olman.",
    "senin için savaşırdım ama verimsiz toprakları feth etmeye gerek yok",
    "birbirimizi çift görmem için kaç duble daha içmeliyim?",
    "azrail bile ayağıma geliyor ne bu tripler?",
    "Buralarda yeniyim de kalbinin yolunu tarif eder misin?",
    "Nasıl yani şimdi sen gerçek misin?",
    "Bunca zaman neredeydin ?",
    "seni seviyorum.",
    "Allah seni yaratmış fakat takip etmiyor sanırım, bu tip ne?",
    "sarılalım mı?",
    "benimle evlenir misin?",
    "azıcık beynini kullan diyeceğim fakat seni zor durumda bırakmak istemiyorum.",
    "akıllara zarar bi mükemmelliğin var",
    "attan indiysek leopar falan gelmiştir ben anlamam eşekten",
    "dedikodu yapalım mı?",
    "iyi ki varsın 💕",
    "şu üstteki aptik ne anlatıyor ya?",
    "o kadar haklısın ki... seni öpesim var",
    "öpşuelimi? çabuk!",
    "yavrum hepsi senin mi?",
    "bi alo de gelmezsem gençliğim solsun.",
    "çok şişkosun.",
    "sevgilim var yazma?",
    "zenginsen evlenelim mi?",
    "halk pazarı gibisin canım sana olan tek ilgim ucuzluğundan",
    "o kadar çok meslek türü varken neden şerefsizlik tatlım?",
    "bu güne aynayı öperek başladım",
    "çok bereketli topraklarımız yok mu? her türlü şerefsiz yetişiyor",
    "taş gibisin!",
    "kalitesizliğinin kokusu geldi...",
    "Şey gözlerin çok güzelmiş tanışalım mı ?",
    "Kalbinin yolunu gösterir misin...",
    "Corona olsan bile sana sarılırdım",
    "Oha sen gerçek misin ?",
    "kahveyi sütsüz seni tereddütsüz seviyorum",
    "senin hava attığın yerde benim rüzgarım esiyor",
    "çok güzel bi tablo gördüm tam alacaktım ama aynaymış...",
    "canım haddin hariç her şeyi biliyorsun",
    "havalar alev gibii, tatile serin bi yerlere gitsene mesela morg?",
    "tavla oynayalım ama sen beni tavla",
    "hava sıcak değil aşkından yanıyorum",
    "konum atta belamızı bulalım bebeğim",
    "üşüdüysen sana abayı yakayım mı?",
    "gel biraz otur yanıma ölünce gidersin",
    "sütüm yarım yağlı mutluluğum sana bağlı",
    "eğer ahtapot olsaydım üç kalbimi de sana verirdim",
    "salağa yatarken uyuya falan mı kaldın?",
    "meleksin ama canımı alıyorsun yoksa Azrailim misin?",
    "ben varya fay hattı olsam kesin daha az kırılırdım",
    "iban at hayallerimi yollayayım harcarsın",
    "ankarada deniz sende karakter",
    "sana hayatım diyorum çünkü o kadar kötüsün",
    "görüşelim mi? mahşer yeri uygun mu?",
    "eşekten yarış atı olmaz ama sen genede koş spor yaparsın",
    "Anlatsana biraz neden bu kadar mükemmelsin?",
    "Nasılsın diye sorma bebeğim, sana göreyim kıpss",
    "Kakaolu sütsün seni sevmeyen ölsün",
    "Ya sen hep böyle hoşuma mı gideceksin ?",
    "Çikolatalı keksin bu alemde teksin",
    "8 milyar gülüş varken seninki favorim",
    "dalin gibi kokuyorsun",
    "seni her gün görenlerin şansından istiyorum",
    "en iyisine layıksın yani bana hıh",
    "ateşimin çıkma sebebi corona değil, sensin",
    "yemeğimi yedim şimdi seni yeme vakti",
    "beni biraz takar mısın?",
    "aklın başına gelir ama ben sana gelmem",
    "sen beni birde sevgilinken gör",
    "naber lan karakter kanseri",
    "soğuk davranacaksan üzerime bir şey alayım?",
    "sana beyin alacam",
    "Allah belanı vermiyor artık ben bir şey yapacağım",
    "artık benimsin",
    "o kadar pubg oynadım böyle vurulmadım",
    "canın yandı mı? cenneten düşerken?",
    "seni mumla ararken elektrikler geldi",
    "burnunda sümük var",
    "Suyun içinde klorür senin kalbinde bir ömür...",
    "Çok tatlı olmayı bırak artık... Kalbim başa çıkamıyor !",
    "Kalbini dinle dediklerinde seni dinleyesim geliyor",
    "Polisi arıyorum çünkü bu kadar tatlı olman yasadışı !",
    "Ölüm ani dünya fani bi kere sevsen nolur ki yani ?",
    "Bana yüzünü dönme gece oluyor sanıyorum.",
    "Güneş aya ben sana tutuldum.",
    "Sana gemi alalım dümende bir numarasın.",
    "AÇILIN DÜNYANIN 8.HARİKASI GELDİ !",
    "Ben küçücük bi botum ama sana kocaman sarılırım",
    "Kafam çok güzel çünkü içinde sen varsın.",
    "Alnın güzelmiş yazısı olabilir miyim ?",
    "Gülüşün şimşek içermiyiz birer milkşeyk ?",
    'seni cok sevio canim.',
    'Mavi gözlerin, gökyüzü oldu dünyamın.',
    'Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.',
    'Huzur kokuyor geçtiğin her yer.',
    'Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.',
    'Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.',
    'Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.',
    'Onu Bunu Boşver de bize gel 2 bira içelim.',
    "Gülüşün ne güzel öyle- cumhuriyetin gelişi gibi...",
    "Dur beynimi çıkarayım, eşit şartlarda konuşalım",
    "Azrail bile ayağıma geliyor ne bu tripler?",
    "Sevgilim var yazma?",
    "Halk pazarı gibisin canım sana olan tek ilgim ucuzluğundan",
    "O kadar pubg oynadım böyle vurulmadım",
    "Sen benim mucizemsin, mucizelere inanma sebebimsin.",
    "Dertlerini bana ver sevinçler senin olsun. ...",
    "Narinliğini gören kelebekler seni kıskanır.",
    'Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.',
    'Mavi gözlerin, gökyüzü oldu dünyamın.',
    'Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.',
    'Huzur kokuyor geçtiğin her yer.',
    'Gözlerinle baharı getirdin garip gönlüme.'
];
var iltifatSayi = 0;

module.exports = async (message) => {
    if (!message.guild || message.author.bot) return
    if (["!tag", "tag"].some(x => message.content === x)) {
        message.channel.send(`\`${config.registration.GuilDTag}\``)
    }
    if (message.channel.id === config.channels.chat) {
        iltifatSayi++
        if (iltifatSayi >= config.bot.iltifatsize) {
            iltifatSayi = 0;
            message.reply(`**${(iltifatlar)[Math.floor(Math.random() * ((iltifatlar).length - 1) + 1)]}**`);
        }
    }

    const afkembed = new MessageEmbed()
    .setColor("#2c2f33")
    .setTimestamp()
const etiket = message.mentions.users.first()
const uye = db.fetch(`user_${message.author.id}_${message.guild.id}`)
const nickk = db.fetch(`nick_${message.author.id}_${message.guild.id}`)
if (etiket) {
    const reason = db.fetch(`sebep_${etiket.id}_${message.guild.id}`)
    const uye2 = db.fetch(`user_${etiket.id}_${message.guild.id}`)
    if (message.content.includes(uye2)) {
        const time = db.fetch(`afktime_${message.guild.id}`);
        const timeObj = ms(Date.now() - time);
        message.reply({ embeds: [afkembed.setDescription(`${etiket} kullanıcısı **${reason}** sebebiyle \`${timeObj}\` süresi boyunca afk.`)] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
    }
}
if (message.author.id === uye) {
    message.member.setNickname(nickk).catch(err => console.log(" "))
    db.delete(`sebep_${message.author.id}_${message.guild.id}`)
    db.delete(`user_${message.author.id}_${message.guild.id}`)
    db.delete(`nick_${message.author.id}_${message.guild.id}`)
    db.delete(`user_${message.author.id}_${message.guild.id}`);
    db.delete(`afktime_${message.guild.id}`)
    message.reply({ embeds: [afkembed.setDescription(`Başarıyla **AFK** modundan çıkış yaptınız!`)] }).then((e) => setTimeout(() => { e.delete(); }, 10000));
}
    const ownerr = client.users.cache.get("598974473374400512");
    if (config.bot.prefix && !message.content.startsWith(config.bot.prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || [...client.commands.values()].find((e) => e.aliases && e.aliases.includes(command));
    const author = message.author
    const channel = message.channel
    const guild = message.guild
    const embed = new MessageEmbed().setColor(message.member.displayHexColor).setAuthor(message.member.displayName, author.avatarURL({ dynamic: true, size: 2048 })).setTimestamp().setFooter((config.bot.BotFooter), message.guild.iconURL()) 

    if (cmd) {
        if (cmd.owner && config.bot.owner !== author.id) return;
        if (cmd.guildowner && config.bot.owner !== author.id && guild.owner.id !== author.id) return;
        if (client.cooldown.has(author.id) === config.bot.cooldown) {
            client.commandblocked.push(author.id)
            message.reply({ embeds: [embed.setDescription(`${author} komutları kötüye kullandığın için engellendin.`)] });
        }
        if (client.commandblocked.includes(message.author)) return;
        cmd.execute(client, message, args, embed, author, channel, guild);
        if (config.bot.owner !== author && guild.owner !== author) {
            if (!client.cooldown.has(author)) client.cooldown.set(author, 1);
            else client.cooldown.set(author.id, client.cooldown.get(author.id) + 1);
        }
        setTimeout(() => {
            if (client.cooldown.has(author.id)) {
                client.cooldown.delete(author.id)
            }
        }, 1000 * 60 * 5);
    }
}

module.exports.conf = {
    name: "messageCreate"
}
