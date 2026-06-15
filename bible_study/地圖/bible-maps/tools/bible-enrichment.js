/**
 * Rich storyboards and analysis for 14 Bible / church-history maps.
 */
module.exports = function ({ cam }) {
  const S = (day, lng, lat, dist, o) => ({
    day,
    hold: o.hold || 8,
    cam: cam(lng, lat, dist, o.el || 46),
    dateLabel: o.date,
    title_zh: o.zh,
    title_en: o.en,
    narration_zh: o.nz,
    narration_en: o.ne,
    focus: o.focus || [],
    side: o.side || "both",
    commanders: o.commanders || [],
    assets: o.assets || [],
    forces_zh: o.fz || "",
    forces_en: o.fe || "",
  });

  const A = (military, leaders, theology, impact) => ({ military, leaders, nationalPower: theology, impact });

  return {
    abraham: {
      END_DAY: 100,
      analysis: A(
        "亞伯蘭蒙召離開吾珥，經哈蘭遷往迦南；因饑荒下埃及，後分別與羅得，在希伯崙居住；在摩利亞獻以撒，見證信心順服。",
        "亞伯蘭／亞伯拉罕為信心之父；撒萊、羅得、麥基洗德、以撒均為關鍵人物。耶和華與他立約，應許土地與後裔。",
        "耶和華與亞伯蘭立約：「我要使你成為大國，地上萬族因你得福。」應許之地的預表指向基督與新約信徒的產業。",
        "亞伯拉罕的旅程奠定選民歷史起點；新約視他為因信稱義的楷模（羅4；加3）。"
      ),
      storyboard: [
        S(1, 46.1, 30.96, 720, { date: "約前2000年", zh: "吾珥的呼召", en: "Call from Ur", nz: "耶和華對亞伯蘭說：你要離開本地、本族、父家，往我所要指示你的地去。", ne: "The LORD called Abram to leave Ur for the land He would show him.", focus: ["abram"], commanders: [{ zh: "亞伯蘭", en: "Abram" }] }),
        S(22, 39.02, 36.86, 680, { date: "約前2000年", zh: "停留哈蘭", en: "Sojourn in Haran", nz: "亞伯蘭帶著妻子撒萊與姪兒羅得，從哈蘭往迦南地去。", ne: "Abram departed Haran with Sarai and Lot toward Canaan.", focus: ["abram"] }),
        S(42, 35.28, 32.21, 620, { date: "約前2000年", zh: "進入迦南", en: "Entering Canaan", nz: "亞伯蘭經過示劍，耶和華顯現應許：「我要將這地賜給你的後裔。」", ne: "At Shechem the LORD promised the land to Abram's offspring.", focus: ["abram"] }),
        S(62, 35.1, 31.53, 580, { date: "約前2000年", zh: "希伯崙居住", en: "Dwelling in Hebron", nz: "亞伯蘭在希伯崙築壇；與羅得分地，羅得選約旦平原，亞伯蘭仍住迦南。", ne: "Abram settled near Hebron and parted from Lot, who chose the Jordan plain.", focus: ["abram"] }),
        S(85, 35.23, 31.78, 650, { date: "約前2000年", zh: "摩利亞獻以撒", en: "Isaac on Moriah", nz: "耶和華試驗亞伯拉罕，命他在摩利亞獻以撒；耶和華預備羊羔，堅立永約。", ne: "On Moriah Abraham offered Isaac in faith; God provided a ram and confirmed the covenant.", focus: ["abram"], commanders: [{ zh: "亞伯拉罕", en: "Abraham" }, { zh: "以撒", en: "Isaac" }] }),
      ],
    },

    "exodus-canaan": {
      END_DAY: 100,
      analysis: A(
        "以色列人在埃及受奴役；摩西領百姓出埃及，過紅海，在西奈領律法，曠野漂流四十年；約書亞率民過約旦，攻取耶利哥，開始征服迦南。",
        "摩西、亞倫、約書亞、迦勒為核心領袖；法老與亞瑪力王為主要敵對勢力。",
        "出埃及預表救贖；逾越羔羊指向上十字架的基督；律法顯明罪，引到基督；進迦南預表信徒進入屬靈安息。",
        "出埃及成為以色列國族認同的根基；新約將救恩比作從罪權勢中得釋放。"
      ),
      storyboard: [
        S(1, 31.87, 30.8, 680, { date: "約前1446年", zh: "埃及為奴", en: "Slavery in Egypt", nz: "以色列人在蘭塞地作苦工，哀聲達到神面前。", ne: "Israel groaned under bondage in the land of Rameses.", focus: ["israel_ex", "egypt_ex"], commanders: [{ zh: "摩西", en: "Moses" }] }),
        S(22, 33.0, 28.5, 620, { date: "約前1446年", zh: "過紅海", en: "Crossing the Red Sea", nz: "摩西伸杖分海，以色列人走乾地過海；埃及軍追趕，海水回流淹沒軍兵。", ne: "The sea parted for Israel; Egypt's army was swallowed by the returning waters.", focus: ["israel_ex"], assets: ["landing"] }),
        S(42, 33.97, 28.54, 600, { date: "約前1446年", zh: "西奈立約", en: "Covenant at Sinai", nz: "在西奈山頒布十誡與律法，立以色列為祭司國度、聖潔的國民。", ne: "At Sinai God gave the Law and made Israel a kingdom of priests.", focus: ["israel_ex"] }),
        S(62, 34.45, 30.6, 580, { date: "曠野四十年", zh: "加低斯漂流", en: "Wilderness Years", nz: "因不信，一代人在曠野倒斃；只有約書亞、迦勒進入應許地。", ne: "An unbelieving generation perished; only Joshua and Caleb would enter the land.", focus: ["israel_ex"] }),
        S(85, 35.46, 31.87, 650, { date: "約前1400年", zh: "攻取耶利哥", en: "Fall of Jericho", nz: "約書亞率民過約旦，繞城七日，耶利哥城牆倒塌，開始征服迦南。", ne: "Joshua led Israel across the Jordan; Jericho's walls fell — the conquest began.", focus: ["israel_ex"], commanders: [{ zh: "約書亞", en: "Joshua" }], assets: ["firefight"] }),
      ],
    },

    judges: {
      END_DAY: 100,
      analysis: A(
        "士師時代呈現「犯罪—受壓—呼求—興起士師—太平—再犯罪」的循環；主要戰役包括底波拉抗西西拉、基甸擊米甸、參孫對非利士等。",
        "俄陀聶、以笏、底波拉、基甸、參孫、撒母耳等士師；敵軍包括米甸人、摩押人、迦南王、非利士人。",
        "士師顯明人心偏離與神恩典的介入；「各人任意而行」反映沒有王時的混亂，預示需要合神心意的君王。",
        "為大衛王朝與王國興起鋪路；新約將士師時期視為救恩歷史中管教與等候的階段。"
      ),
      storyboard: [
        S(1, 35.2, 32.2, 650, { date: "約前1400–1050年", zh: "循環開始", en: "Cycle of Apostasy", nz: "以色列人行耶和華眼中看為惡的事，耶和華就把他們交在仇敵手中。", ne: "Israel did evil and the LORD gave them into enemy hands.", focus: ["judges_is", "judges_en"] }),
        S(25, 35.18, 32.58, 600, { date: "約前1200年", zh: "底波拉與巴拉", en: "Deborah and Barak", nz: "底波拉召巴拉在他納河邊攻擊西西拉，耶和華使敵軍潰敗。", ne: "Deborah and Barak defeated Sisera at the Kishon — the LORD routed the enemy.", focus: ["judges_is"], commanders: [{ zh: "底波拉", en: "Deborah" }] }),
        S(45, 35.5, 32.0, 580, { date: "約前1160年", zh: "基甸擊米甸", en: "Gideon vs Midian", nz: "基甸率三百人吹角擊破米甸大軍，「耶和華為你們爭戰」。", ne: "Gideon's three hundred routed Midian — 'The LORD fought for you.'", focus: ["judges_is"], commanders: [{ zh: "基甸", en: "Gideon" }] }),
        S(65, 35.0, 31.8, 560, { date: "士師末期", zh: "參孫與非利士", en: "Samson and Philistia", nz: "參孫作以色列士師，與非利士人周旋；最終在神裡同歸於盡。", ne: "Samson judged Israel and clashed with the Philistines until his final act of faith.", focus: ["judges_en"], commanders: [{ zh: "參孫", en: "Samson" }] }),
        S(88, 35.2, 32.2, 680, { date: "約前1050年", zh: "求立王", en: "Demand for a King", nz: "士師時代末期，百姓求撒母耳立王，預示掃羅與大衛時代來臨。", ne: "At the end of the judges era Israel demanded a king — the monarchy was near.", focus: ["judges_is"] }),
      ],
    },

    david: {
      END_DAY: 100,
      analysis: A(
        "大衛從伯利恆牧童被膏；在以拉谷擊殺歌利亞；躲避掃羅多年後作猶大王，再統一全以色列，建都耶路撒冷。",
        "大衛、約拿單、掃羅、撒母耳、押沙龍為主要人物；非利士為主要外敵。",
        "大衛為合神心意的人；神與他立約，應許彌賽亞出自大衛家；其詩篇見證敬拜與悔改。",
        "大衛王朝成為彌賽亞盼望的載體；耶路撒冷成為聖城與聖殿中心。"
      ),
      storyboard: [
        S(1, 35.2, 31.7, 620, { date: "約前1020年", zh: "伯利恆牧童", en: "Shepherd of Bethlehem", nz: "撒母耳在伯利恆膏大衛；耶和華說：我尋得合我心意的人。", ne: "Samuel anointed David at Bethlehem — 'A man after God's own heart.'", focus: ["david_army"], commanders: [{ zh: "大衛", en: "David" }] }),
        S(25, 34.98, 31.7, 580, { date: "約前1010年", zh: "擊殺歌利亞", en: "David and Goliath", nz: "大衛在以拉谷用機弦石擊倒非利士巨人歌利亞，耶和華得勝。", ne: "David struck down Goliath in the Valley of Elah — victory belonged to the LORD.", focus: ["david_army", "philistines"], assets: ["firefight"] }),
        S(45, 35.1, 31.75, 560, { date: "約前1010–1003年", zh: "躲避掃羅", en: "Fleeing Saul", nz: "大衛被掃羅追逼，卻兩次不害受膏者，等候神時候。", ne: "David fled Saul yet twice spared the LORD's anointed.", focus: ["david_army"] }),
        S(65, 35.23, 31.78, 600, { date: "約前1003年", zh: "作猶大王", en: "King of Judah", nz: "掃羅陣亡後，大衛先在希伯崙作猶大王七年半。", ne: "After Saul's death David reigned over Judah at Hebron for seven and a half years.", focus: ["david_army"] }),
        S(88, 35.23, 31.78, 680, { date: "約前1000年", zh: "統一建都", en: "United Kingdom", nz: "大衛攻取耶路撒冷作京城，迎約櫃入城，籌建聖殿。", ne: "David captured Jerusalem as capital and brought the ark — planning the temple.", focus: ["david_army"], commanders: [{ zh: "大衛", en: "David" }] }),
      ],
    },

    solomon: {
      END_DAY: 100,
      analysis: A(
        "所羅門繼承大衛王位；在耶路撒冷建聖殿，國力達頂峰；與推羅合作，示巴女王來朝；晚年離棄耶和華，國勢埋下分裂種子。",
        "所羅門、大衛、推羅希蘭、示巴女王；先知拿單與亞希雅預言分裂。",
        "所羅門求智慧治理；聖殿為耶和華名居住之地，預表基督與教會；箴言與傳道書見證智慧與虛空。",
        "所羅門的繁榮與敗壞成為後世警戒；聖殿成為敬拜中心直至被毀。"
      ),
      storyboard: [
        S(1, 35.23, 31.78, 650, { date: "約前970年", zh: "繼位求智慧", en: "Wisdom Requested", nz: "所羅門在基遍獻祭，求智慧治理百姓；神賜他智慧、尊榮與財富。", ne: "Solomon asked for wisdom to govern; God gave wisdom, honor, and riches.", focus: ["solomon"], commanders: [{ zh: "所羅門", en: "Solomon" }] }),
        S(25, 35.235, 31.778, 580, { date: "約前966年", zh: "建造聖殿", en: "Building the Temple", nz: "大衛預備材料，所羅門在聖殿山建耶和華殿，七年建成。", ne: "Solomon built the LORD's temple on Mount Moriah over seven years.", focus: ["solomon"] }),
        S(45, 35.2, 33.27, 620, { date: "所羅門年間", zh: "與推羅合作", en: "Alliance with Tyre", nz: "所羅門與推羅王希蘭合作，建殿並發展海上貿易。", ne: "Solomon partnered with Hiram of Tyre for the temple and maritime trade.", focus: ["solomon"] }),
        S(65, 35.23, 31.78, 560, { date: "所羅門年間", zh: "示巴女王", en: "Queen of Sheba", nz: "示巴女王聽聞所羅門的智慧，前來觀看，稱頌耶和華。", ne: "The Queen of Sheba came to test Solomon's wisdom and praised the LORD.", focus: ["solomon"] }),
        S(88, 35.23, 31.78, 700, { date: "約前931年", zh: "晚年離棄", en: "Turning Away", nz: "所羅門為外邦妃嬪建丘壇，心偏離耶和華；神預告國度將分裂。", ne: "Solomon's heart turned; God foretold the kingdom would be torn away.", focus: ["solomon"] }),
      ],
    },

    "kingdom-split": {
      END_DAY: 100,
      analysis: A(
        "羅波安拒納老臣忠告，加重百姓轕軛；北方十支派在示劍叛變，立耶羅波安為王；耶羅波安設但與伯特利金牛犢，陷北國於罪。",
        "羅波安、耶羅波安、先知亞希雅；南國猶大仍守大衛家，北國以色列十九王朝更迭。",
        "分裂反映人心悖逆與敬拜中心被扭曲；耶羅波安罪惡成為北國敗壞的標誌。",
        "南北分裂直至被擄；猶大線保存彌賽亞譜系。"
      ),
      storyboard: [
        S(1, 35.28, 32.21, 640, { date: "公元前931年", zh: "示劍會議", en: "Assembly at Shechem", nz: "以色列眾人請羅波安減輕父親所加的重軛。", ne: "Israel asked Rehoboam to lighten the heavy yoke of Solomon.", focus: ["judah", "israel_n"], commanders: [{ zh: "羅波安", en: "Rehoboam" }] }),
        S(25, 35.28, 32.21, 600, { date: "公元前931年", zh: "十支派叛變", en: "Ten Tribes Rebel", nz: "羅波安聽少年人建議，宣告加重責打；北方說：我們與大衛有什麼分兒！", ne: "Rehoboam refused wisely; the north cried: 'What share have we in David?'", focus: ["israel_n"], commanders: [{ zh: "耶羅波安", en: "Jeroboam" }] }),
        S(45, 35.23, 31.78, 580, { date: "公元前931年", zh: "猶大留守", en: "Judah Remains", nz: "只有猶大支派與便雅憫仍歸大衛家，羅波安作耶路撒冷王。", ne: "Only Judah and Benjamin stayed with the house of David in Jerusalem.", focus: ["judah"] }),
        S(65, 35.19, 32.27, 560, { date: "分裂後", zh: "撒瑪利亞為都", en: "Samaria as Capital", nz: "耶羅波安定都撒瑪利亞，北國以色列歷史由此展開。", ne: "Jeroboam established Samaria — northern Israel's history unfolded.", focus: ["israel_n"] }),
        S(88, 35.2, 32.0, 680, { date: "分裂後", zh: "金牛犢之罪", en: "Calves of Bethel", nz: "耶羅波安在但和伯特利設金牛犢，使百姓陷於偶像敬拜。", ne: "Jeroboam set up golden calves at Dan and Bethel — idolatry gripped the north.", focus: ["israel_n"] }),
      ],
    },

    prophets: {
      END_DAY: 100,
      analysis: A(
        "先知從北國以利亞、以利沙，到南國以賽亞、耶利米、以西結等，在審判與安慰中傳達耶和華的話；部分被擄至巴比倫仍發預言。",
        "以利亞、以利沙、阿摩司、何西亞、以賽亞、彌迦、耶利米、以西結、但以理、哈該、撒迦利亞、瑪拉基。",
        "先知呼籲悔改，預告審判與復興；彌賽亞預言貫穿其中，指向受苦與榮耀的君王。",
        "先知書成為舊約神學高峰；新約證實預言在基督身上應驗。"
      ),
      storyboard: [
        S(1, 35.19, 32.27, 650, { date: "約前9世紀", zh: "北國先知", en: "Northern Prophets", nz: "以利亞在迦密山對抗巴力先知；以利沙接續其工。", ne: "Elijah confronted Baal on Carmel; Elisha continued his ministry.", focus: ["prophets"], commanders: [{ zh: "以利亞", en: "Elijah" }] }),
        S(22, 35.23, 31.78, 620, { date: "約前8世紀", zh: "南國大先知", en: "Major Prophets of Judah", nz: "以賽亞在耶路撒冷預言童女懷孕生子；彌迦預告伯利恆出生的君王。", ne: "Isaiah foretold a virgin-born son; Micah named Bethlehem as Messiah's birthplace.", focus: ["prophets"], commanders: [{ zh: "以賽亞", en: "Isaiah" }] }),
        S(42, 35.23, 31.78, 600, { date: "約前7–6世紀", zh: "耶利米與審判", en: "Jeremiah's Warning", nz: "耶利米呼籲猶大悔改，預言聖殿與城將被毀，卻應許新約。", ne: "Jeremiah warned of Jerusalem's fall yet promised a new covenant.", focus: ["prophets"], commanders: [{ zh: "耶利米", en: "Jeremiah" }] }),
        S(62, 44.42, 32.54, 680, { date: "被擄期", zh: "巴比倫先知", en: "Prophets in Exile", nz: "以西結在巴比倫見異象；但以理在宮中見證；預言復歸與彌賽國度。", ne: "Ezekiel and Daniel prophesied in Babylon — visions of restoration and God's kingdom.", focus: ["prophets"], commanders: [{ zh: "以西結", en: "Ezekiel" }, { zh: "但以理", en: "Daniel" }] }),
        S(85, 35.23, 31.78, 650, { date: "約前5世紀", zh: "歸回與瑪拉基", en: "Return and Malachi", nz: "哈該、撒迦利亞鼓勵重建聖殿；瑪拉基預告以利亞再來，舊約先知聲音止息。", ne: "Haggai and Zechariah urged temple rebuilding; Malachi closed the prophetic era.", focus: ["prophets"] }),
      ],
    },

    "israel-fall": {
      END_DAY: 100,
      analysis: A(
        "北國以色列經十九王朝更迭，終於亞述王撒珥根二世圍攻撒瑪利亞三年，城陷後百姓被擄散至亞述各城。",
        "何細亞為末代以色列王；亞述諸王為征服者；先知何西亞、阿摩司曾預告審判。",
        "亡國是長期偶像與背約的後果；「我必追趕他們，卻追不上」顯明神的離棄。",
        "北國十支派被擄後融入外邦；猶大仍保存大衛譜系與敬拜中心。"
      ),
      storyboard: [
        S(1, 35.19, 32.27, 620, { date: "約前722年前", zh: "北國末期", en: "Final Years of Israel", nz: "北國罪惡滿盈，何細亞背叛亞述，引來大軍圍攻。", ne: "Israel's sin was full; Hoshea's revolt brought Assyrian invasion.", focus: ["samaria", "assyria"] }),
        S(25, 35.19, 32.27, 580, { date: "約前724年", zh: "圍攻撒瑪利亞", en: "Siege of Samaria", nz: "亞述王圍困撒瑪利亞三年，城內饑荒極甚。", ne: "Assyria besieged Samaria for three years — famine ravaged the city.", focus: ["assyria"], assets: ["artillery"] }),
        S(50, 35.19, 32.27, 560, { date: "公元前722年", zh: "城陷", en: "City Falls", nz: "撒瑪利亞城被攻取，以色列王何細亞被囚。", ne: "Samaria fell; King Hoshea was imprisoned.", focus: ["samaria"], assets: ["firefight"] }),
        S(72, 35.5, 33.5, 700, { date: "公元前722年", zh: "被擄分散", en: "Deportation", nz: "亞述王將以色列人擄到亞述各地，又從外邦遷人入撒瑪利亞。", ne: "Israelites were deported across Assyria; foreigners settled Samaria.", focus: ["assyria"] }),
        S(92, 35.19, 32.27, 680, { date: "公元前722年", zh: "北國終結", en: "End of Northern Kingdom", nz: "以色列國滅亡，只剩南國猶大；先知預言的審判應驗。", ne: "The northern kingdom ended — only Judah remained; prophetic judgment was fulfilled.", focus: ["samaria"] }),
      ],
    },

    "judah-fall": {
      END_DAY: 100,
      analysis: A(
        "猶大屢次背叛，尼布甲尼撒多次攻耶路撒冷；最終城陷、聖殿被焚、百姓被擄巴比倫，開始七十年被擄期。",
        "約雅敬、西底家為末代猶大王；尼布甲尼撒、巴比倫軍；耶利米、以西結預言審判與盼望。",
        "聖殿被毀顯明神離開因罪玷污的敬拜；新約指向基督作真正的殿；被擄促使悔改與新約應許。",
        "被擄結束以斯拉、尼希米歸回重建；為彌賽亞降生時的猶太地景奠定基礎。"
      ),
      storyboard: [
        S(1, 35.23, 31.78, 620, { date: "約前597年", zh: "首次被擄", en: "First Deportation", nz: "尼布甲尼撒攻耶路撒冷，擄去約雅敬與貴胄。", ne: "Nebuchadnezzar took Jehoiachin and nobles to Babylon.", focus: ["jerusalem", "babylon"] }),
        S(25, 35.23, 31.78, 580, { date: "約前586年前", zh: "西底家叛變", en: "Zedekiah's Revolt", nz: "西底家背約投靠埃及，巴比倫大軍再圍耶路撒冷。", ne: "Zedekiah rebelled; Babylon's army returned to besiege Jerusalem.", focus: ["babylon"], commanders: [{ zh: "西底家", en: "Zedekiah" }] }),
        S(50, 35.23, 31.78, 560, { date: "公元前586年", zh: "城牆被破", en: "Walls Breached", nz: "城圍一年半，饑荒極甚，城被攻陷；西底家眾子被殺，他被剜眼。", ne: "After eighteen months the city fell; Zedekiah's sons were killed, his eyes put out.", focus: ["jerusalem"], assets: ["firefight"] }),
        S(72, 35.235, 31.778, 540, { date: "公元前586年", zh: "聖殿被焚", en: "Temple Destroyed", nz: "尼布甲尼撒焚燒耶和華殿與城內大戶房屋，拆毀城牆。", ne: "Nebuchadnezzar burned the LORD's temple and tore down the walls.", focus: ["jerusalem"], assets: ["artillery"] }),
        S(92, 44.42, 32.54, 720, { date: "公元前586年", zh: "被擄巴比倫", en: "Exile to Babylon", nz: "百姓被擄至巴比倫，「我們曾在錫安琴旁懸掛琴瑟」；七十年為期。", ne: "The people were exiled to Babylon — seventy years as Jeremiah had foretold.", focus: ["babylon"] }),
      ],
    },

    jesus: {
      END_DAY: 100,
      analysis: A(
        "耶穌在伯利恆降生，在拿撒勒成長；在加利利開始公開事工，呼召門徒；在耶路撒冷受難、埋葬、第三日復活。",
        "耶穌、馬利亞、約瑟、施洗約翰、十二門徒、彼拉多、猶太領袖。",
        "道成肉身；耶穌宣告天國近了；十字架成就救贖；復活戰勝死亡，顯明祂是神的兒子。",
        "基督生平是救恩歷史的中心；教會建立在復活見證之上；大使命差遣門徒往普天下去。"
      ),
      storyboard: [
        S(1, 35.2, 31.7, 620, { date: "約公元前4年", zh: "伯利恆降生", en: "Birth at Bethlehem", nz: "馬利亞在伯利恆生下耶穌；天使報喜，牧羊人來拜。", ne: "Jesus was born in Bethlehem — angels announced good news to shepherds.", focus: ["jesus"] }),
        S(22, 35.3, 32.7, 600, { date: "成長", zh: "拿撒勒成長", en: "Growing in Nazareth", nz: "耶穌在拿撒勒長大，智慧與身量一齊增長，神和人喜愛祂。", ne: "Jesus grew in wisdom and stature in Nazareth, favored by God and man.", focus: ["jesus"] }),
        S(42, 35.58, 32.88, 580, { date: "約公元27–30年", zh: "加利利事工", en: "Ministry in Galilee", nz: "耶穌在迦百農呼召門徒，醫病、趕鬼、講道，天國的福音傳開。", ne: "At Capernaum Jesus called disciples, healed, taught — the gospel of the kingdom spread.", focus: ["jesus"], commanders: [{ zh: "耶穌", en: "Jesus" }] }),
        S(65, 35.23, 31.78, 560, { date: "公元30年", zh: "耶路撒冷受難", en: "Passion Week", nz: "耶穌騎驢進城，最後晚餐，客西馬尼禱告，被釘十字架。", ne: "Triumphal entry, Last Supper, Gethsemane — then the cross.", focus: ["jesus"] }),
        S(88, 35.23, 31.78, 650, { date: "公元30年", zh: "復活", en: "Resurrection", nz: "第三日從死裡復活，向門徒顯現，吩咐他們作祂見證直到地極。", ne: "On the third day He rose, appeared to disciples, and commissioned them to the ends of the earth.", focus: ["jesus"] }),
      ],
    },

    paul: {
      END_DAY: 100,
      analysis: A(
        "保羅（掃羅）在大馬士革路上遇復活主後歸主；三次宣教旅程橫越小亞細亞、希臘，建立眾教會；最終在羅馬為主作證。",
        "保羅、巴拿巴、西拉、提摩太、路加；彼拉多、猶太領袖、羅馬官員；各城會眾與反對者。",
        "因信稱義的福音傳向外邦；保羅書信闡明因信與教會論；「我當得的報應已經在了」見證忠心到底。",
        "保羅開闢歐洲宣教路線；其書信構成新約神學重要部分；羅馬教會成為帝國中心據點。"
      ),
      storyboard: [
        S(1, 36.2, 36.2, 680, { date: "約公元46年", zh: "安提阿差遣", en: "Sent from Antioch", nz: "安提阿教會按手差遣保羅與巴拿巴，開始第一次宣教旅程。", ne: "The church at Antioch sent Paul and Barnabas on the first missionary journey.", focus: ["paul"], commanders: [{ zh: "保羅", en: "Paul" }] }),
        S(22, 27.34, 37.94, 620, { date: "第一次宣教", zh: "以弗所與加拉太", en: "Ephesus and Galatia", nz: "保羅在小亞細亞傳道，各城有人歸主，也遭遇逼迫。", ne: "Paul preached across Asia Minor — converts and persecution followed.", focus: ["paul"] }),
        S(42, 22.93, 37.94, 600, { date: "第二次宣教", zh: "哥林多建立教會", en: "Church in Corinth", nz: "保羅在哥林多住了一年半，建立教會，寫哥林多前後書。", ne: "Paul stayed eighteen months in Corinth, planting the church and writing letters.", focus: ["paul"] }),
        S(62, 23.7, 37.9, 580, { date: "第三次宣教", zh: "以弗所三年", en: "Three Years in Ephesus", nz: "保羅在以弗所勞苦作工，「兩年的工夫，叫一切住在亞細亞的人都聽見主道」。", ne: "Two years in Ephesus — all Asia heard the word of the Lord.", focus: ["paul"] }),
        S(85, 12.5, 41.9, 720, { date: "約公元60–67年", zh: "羅馬見證", en: "Witness in Rome", nz: "保羅為上告羅馬，在該撒家裡和別處傳福音，「我當得的報應已經在了」。", ne: "Paul appealed to Caesar and preached in Rome — 'I have finished the race.'", focus: ["paul"], commanders: [{ zh: "保羅", en: "Paul" }] }),
      ],
    },

    "gospel-europe": {
      END_DAY: 100,
      analysis: A(
        "使徒時代後，福音經羅馬大道與商路傳播；君士坦丁合法化後教會擴展；東羅馬與傳教士將信仰帶至斯拉夫與基輔羅斯。",
        "初期教父、波利卡普、愛任紐；君士坦丁大帝；西里爾與美多德兄弟；弗拉基米爾大公。",
        "教會承接大使命，在帝國與蠻族世界中見證基督；正教傳統在東歐扎根，與拉丁西教並行發展。",
        "福音塑造歐洲文明；俄羅斯正教成為該地區文化與信仰核心。"
      ),
      storyboard: [
        S(1, 12.5, 41.9, 680, { date: "1–3世紀", zh: "羅馬帝國傳播", en: "Gospel in the Empire", nz: "保羅及眾使徒在羅馬帝國各城建立教會；逼迫中信仰仍擴展。", ne: "Apostles and missionaries planted churches across the Roman Empire despite persecution.", focus: ["church"] }),
        S(25, 12.5, 41.9, 640, { date: "313年", zh: "合法化", en: "Legalization", nz: "君士坦丁頒《米蘭詔書》，基督教獲合法地位，公開傳播加速。", ne: "The Edict of Milan legalized Christianity — public proclamation accelerated.", focus: ["church"] }),
        S(45, 28.98, 41.01, 620, { date: "4世紀", zh: "君士坦丁堡", en: "Constantinople", nz: "君士坦丁堡成為東羅馬帝國與東方教會中心，神學與禮儀傳統發展。", ne: "Constantinople became the center of Eastern Christianity and theology.", focus: ["church"] }),
        S(65, 24.0, 42.7, 600, { date: "9世紀", zh: "斯拉夫宣教", en: "Mission to the Slavs", nz: "西里爾與美多德兄弟向斯拉夫民族傳福音，創制斯拉夫文字。", ne: "Cyril and Methodius evangelized the Slavs and created the Slavic alphabet.", focus: ["church"] }),
        S(88, 30.52, 50.45, 720, { date: "10世紀", zh: "基輔羅斯歸主", en: "Christianization of Rus", nz: "弗拉基米爾大公受洗，基輔羅斯正式皈依正教，福音深入東歐。", ne: "Prince Vladimir's baptism brought Kievan Rus into Orthodox Christianity.", focus: ["church"] }),
      ],
    },

    crusades: {
      END_DAY: 100,
      analysis: A(
        "1095年烏爾班二世在克萊蒙號召收復聖地；第一次十字軍1099年攻陷耶路撒冷；此後兩百年間多次遠征，阿卡陷落（1291）標誌結束。",
        "烏爾班二世、理查一世、薩拉丁、鮑德溫一世；十字軍諸侯與阿尤布王朝穆斯林領袖。",
        "十字軍混合宗教熱忱與政治利益；對猶太人與穆斯林造成慘痛傷害，亦加深東西方教會裂痕。",
        "聖地戰爭塑造中世紀歐洲與中東關係；留下複雜的歷史與信仰反思。"
      ),
      storyboard: [
        S(1, 12.5, 41.9, 700, { date: "1095年", zh: "克萊蒙號召", en: "Council of Clermont", nz: "教皇烏爾班二世號召收復被穆斯林佔據的聖地耶路撒冷。", ne: "Pope Urban II called for the recovery of Jerusalem from Muslim rule.", focus: ["crusaders"] }),
        S(22, 36.2, 36.2, 640, { date: "1097–1098年", zh: "安條克圍城", en: "Siege of Antioch", nz: "十字軍圍攻安條克，經艱苦戰役奪取，繼續南下。", ne: "Crusaders besieged and captured Antioch, then marched south.", focus: ["crusaders", "ayyubids"], assets: ["firefight"] }),
        S(45, 35.23, 31.78, 600, { date: "1099年", zh: "攻陷耶路撒冷", en: "Jerusalem Captured", nz: "第一次十字軍攻陷耶路撒冷，建立耶路撒冷王國。", ne: "The First Crusade captured Jerusalem — the Latin Kingdom was established.", focus: ["crusaders"], assets: ["firefight"] }),
        S(65, 35.23, 31.78, 580, { date: "1187年", zh: "哈丁與薩拉丁", en: "Hattin and Saladin", nz: "薩拉丁在哈丁大敗十字軍，同年收復耶路撒冷。", ne: "Saladin defeated the crusaders at Hattin and recaptured Jerusalem.", focus: ["ayyubids"], commanders: [{ zh: "薩拉丁", en: "Saladin" }] }),
        S(88, 35.08, 32.93, 650, { date: "1291年", zh: "阿卡陷落", en: "Fall of Acre", nz: "阿卡城陷落，十字軍在聖地的據點終告瓦解。", ne: "Acre fell — the last major crusader stronghold in the Holy Land was lost.", focus: ["ayyubids"] }),
      ],
    },

    "church-schism": {
      END_DAY: 100,
      analysis: A(
        "東羅馬與羅馬教會在教宗權柄、和子句、禮儀等問題上長期分歧；1054年雙方互相開除教籍，東西教會正式分裂。",
        "羅馬教宗利奧九世、君士坦丁堡牧首米海尔一世；後續東正教與羅馬天主教各自發展。",
        "分裂反映文化、語言與教會政治差異；雙方均宣稱使徒傳承，神學與禮儀傳統逐漸分化。",
        "1054年分裂影響至今；宗教改革後西方基督教進一步分化；當代有對話與修復關係的努力。"
      ),
      storyboard: [
        S(1, 12.5, 41.9, 650, { date: "4–10世紀", zh: "分歧累積", en: "Growing Division", nz: "羅馬與君士坦丁堡在教宗權柄、教義與禮儀上漸生分歧。", ne: "Rome and Constantinople diverged over papal authority, doctrine, and liturgy.", focus: ["rome_ch"] }),
        S(25, 28.98, 41.01, 620, { date: "11世紀", zh: "和子句爭議", en: "Filioque Controversy", nz: "西方加入「和子」條文，東方認為違反大公會議決議，矛盾加劇。", ne: "The Western Filioque clause deepened Eastern opposition.", focus: ["constantinople"] }),
        S(45, 28.98, 41.01, 600, { date: "1054年7月", zh: "互相開除教籍", en: "Mutual Excommunication", nz: "利奧九世使者與君士坦丁堡牧首互相開除教籍，東西分裂公開化。", ne: "Legates of Leo IX and Patriarch Michael excommunicated each other — the schism was formalized.", focus: ["rome_ch", "constantinople"] }),
        S(65, 12.5, 41.9, 580, { date: "1054年後", zh: "天主教發展", en: "Roman Catholic Path", nz: "羅馬教會在中世紀強化教宗權威，發展拉丁禮儀與經院神學。", ne: "Rome strengthened papal authority and developed Latin scholastic theology.", focus: ["rome_ch"] }),
        S(88, 28.98, 41.01, 680, { date: "1054年後", zh: "東正教傳統", en: "Eastern Orthodox Path", nz: "君士坦丁堡為首的東正教保留希臘禮儀，強調大公會議與教父傳統。", ne: "Constantinople-led Orthodoxy preserved Greek liturgy and conciliar tradition.", focus: ["constantinople"] }),
      ],
    },
  };
};
