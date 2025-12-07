import React, { useState, useEffect, useRef, useCallback } from 'react';

// Tang Dynasty Poetry Pairs (Upper/Lower sentences) - 100 pairs
const POETRY_PAIRS = [
  { upper: "舉頭望明月", lower: "低頭思故鄉", wrong: ["低頭吃便當", "低頭看手機", "低頭想睡覺"] },
  { upper: "床前明月光", lower: "疑是地上霜", wrong: ["疑是地上雪", "疑是地上冰", "疑是地上水"] },
  { upper: "春眠不覺曉", lower: "處處聞啼鳥", wrong: ["處處聞鳥叫", "處處聞花香", "處處聞人聲"] },
  { upper: "白日依山盡", lower: "黃河入海流", wrong: ["黃河入海去", "黃河入海歸", "黃河入海回"] },
  { upper: "紅豆生南國", lower: "春來發幾枝", wrong: ["春來發幾葉", "春來發幾花", "春來發幾果"] },
  { upper: "欲窮千里目", lower: "更上一層樓", wrong: ["更上一層高", "更上一層天", "更上一層山"] },
  { upper: "野火燒不盡", lower: "春風吹又生", wrong: ["春風吹又長", "春風吹又開", "春風吹又綠"] },
  { upper: "孤帆遠影碧空盡", lower: "唯見長江天際流", wrong: ["唯見長江天際去", "唯見長江天際歸", "唯見長江天際回"] },
  { upper: "兩個黃鸝鳴翠柳", lower: "一行白鷺上青天", wrong: ["一行白鷺上藍天", "一行白鷺上雲天", "一行白鷺上高空"] },
  { upper: "勸君更盡一杯酒", lower: "西出陽關無故人", wrong: ["西出陽關無朋友", "西出陽關無親人", "西出陽關無家人"] },
  { upper: "相見時難別亦難", lower: "東風無力百花殘", wrong: ["東風無力百花落", "東風無力百花謝", "東風無力百花凋"] },
  { upper: "春蠶到死絲方盡", lower: "蠟炬成灰淚始乾", wrong: ["蠟炬成灰淚始盡", "蠟炬成灰淚始完", "蠟炬成灰淚始無"] },
  { upper: "君不見黃河之水天上來", lower: "奔流到海不復回", wrong: ["奔流到海不復歸", "奔流到海不復還", "奔流到海不復返"] },
  { upper: "君不見高堂明鏡悲白髮", lower: "朝如青絲暮成雪", wrong: ["朝如青絲暮成霜", "朝如青絲暮成銀", "朝如青絲暮成灰"] },
  { upper: "人生得意須盡歡", lower: "莫使金樽空對月", wrong: ["莫使金樽空對天", "莫使金樽空對星", "莫使金樽空對雲"] },
  { upper: "天生我材必有用", lower: "千金散盡還復來", wrong: ["千金散盡還復歸", "千金散盡還復還", "千金散盡還復得"] },
  { upper: "會當凌絕頂", lower: "一覽眾山小", wrong: ["一覽眾山低", "一覽眾山矮", "一覽眾山微"] },
  { upper: "感時花濺淚", lower: "恨別鳥驚心", wrong: ["恨別鳥驚魂", "恨別鳥驚神", "恨別鳥驚魄"] },
  { upper: "烽火連三月", lower: "家書抵萬金", wrong: ["家書抵千金", "家書抵百金", "家書抵十金"] },
  { upper: "國破山河在", lower: "城春草木深", wrong: ["城春草木茂", "城春草木盛", "城春草木綠"] },
  { upper: "隨風潛入夜", lower: "潤物細無聲", wrong: ["潤物細無息", "潤物細無響", "潤物細無音"] },
  { upper: "好雨知時節", lower: "當春乃發生", wrong: ["當春乃發芽", "當春乃發葉", "當春乃發花"] },
  { upper: "曉看紅濕處", lower: "花重錦官城", wrong: ["花重錦官都", "花重錦官府", "花重錦官鎮"] },
  { upper: "遲日江山麗", lower: "春風花草香", wrong: ["春風花草芳", "春風花草馨", "春風花草馥"] },
  { upper: "泥融飛燕子", lower: "沙暖睡鴛鴦", wrong: ["沙暖睡鴛鴦鳥", "沙暖睡鴛鴦鴨", "沙暖睡鴛鴦鵝"] },
  { upper: "江碧鳥逾白", lower: "山青花欲燃", wrong: ["山青花欲開", "山青花欲放", "山青花欲綻"] },
  { upper: "今春看又過", lower: "何日是歸年", wrong: ["何日是歸期", "何日是歸時", "何日是歸日"] },
  { upper: "月落烏啼霜滿天", lower: "江楓漁火對愁眠", wrong: ["江楓漁火對愁思", "江楓漁火對愁苦", "江楓漁火對愁煩"] },
  { upper: "姑蘇城外寒山寺", lower: "夜半鐘聲到客船", wrong: ["夜半鐘聲到客舟", "夜半鐘聲到客舫", "夜半鐘聲到客艇"] },
  { upper: "停車坐愛楓林晚", lower: "霜葉紅於二月花", wrong: ["霜葉紅於二月春", "霜葉紅於二月紅", "霜葉紅於二月霞"] },
  { upper: "遠上寒山石徑斜", lower: "白雲深處有人家", wrong: ["白雲深處有仙家", "白雲深處有隱家", "白雲深處有山家"] },
  { upper: "日照香爐生紫煙", lower: "遙看瀑布掛前川", wrong: ["遙看瀑布掛前山", "遙看瀑布掛前峰", "遙看瀑布掛前嶺"] },
  { upper: "飛流直下三千尺", lower: "疑是銀河落九天", wrong: ["疑是銀河落九霄", "疑是銀河落九重", "疑是銀河落九層"] },
  { upper: "朝辭白帝彩雲間", lower: "千里江陵一日還", wrong: ["千里江陵一日歸", "千里江陵一日返", "千里江陵一日回"] },
  { upper: "兩岸猿聲啼不住", lower: "輕舟已過萬重山", wrong: ["輕舟已過萬重峰", "輕舟已過萬重嶺", "輕舟已過萬重巒"] },
  { upper: "故人西辭黃鶴樓", lower: "煙花三月下揚州", wrong: ["煙花三月下杭州", "煙花三月下蘇州", "煙花三月下廣州"] },
  { upper: "桃花潭水深千尺", lower: "不及汪倫送我情", wrong: ["不及汪倫送我意", "不及汪倫送我心", "不及汪倫送我恩"] },
  { upper: "眾鳥高飛盡", lower: "孤雲獨去閒", wrong: ["孤雲獨去靜", "孤雲獨去悠", "孤雲獨去閒適"] },
  { upper: "相看兩不厭", lower: "只有敬亭山", wrong: ["只有敬亭峰", "只有敬亭嶺", "只有敬亭巒"] },
  { upper: "小時不識月", lower: "呼作白玉盤", wrong: ["呼作白玉碗", "呼作白玉杯", "呼作白玉盤子"] },
  { upper: "又疑瑤台鏡", lower: "飛在青雲端", wrong: ["飛在青雲上", "飛在青雲中", "飛在青雲間"] },
  { upper: "仙人垂兩足", lower: "桂樹何團團", wrong: ["桂樹何圓圓", "桂樹何滿滿", "桂樹何團團圓"] },
  { upper: "白兔搗藥成", lower: "問言與誰餐", wrong: ["問言與誰食", "問言與誰飲", "問言與誰用"] },
  { upper: "危樓高百尺", lower: "手可摘星辰", wrong: ["手可摘星月", "手可摘星斗", "手可摘星宿"] },
  { upper: "不敢高聲語", lower: "恐驚天上人", wrong: ["恐驚天上仙", "恐驚天上神", "恐驚天上君"] },
  { upper: "鋤禾日當午", lower: "汗滴禾下土", wrong: ["汗滴禾下地", "汗滴禾下田", "汗滴禾下泥"] },
  { upper: "誰知盤中飧", lower: "粒粒皆辛苦", wrong: ["粒粒皆艱辛", "粒粒皆艱難", "粒粒皆艱苦"] },
  { upper: "春種一粒粟", lower: "秋收萬顆子", wrong: ["秋收萬顆粒", "秋收萬顆穀", "秋收萬顆米"] },
  { upper: "四海無閒田", lower: "農夫猶餓死", wrong: ["農夫猶餓亡", "農夫猶餓斃", "農夫猶餓終"] },
  { upper: "離離原上草", lower: "一歲一枯榮", wrong: ["一歲一枯盛", "一歲一枯茂", "一歲一枯長"] },
  { upper: "遠芳侵古道", lower: "晴翠接荒城", wrong: ["晴翠接荒鎮", "晴翠接荒村", "晴翠接荒鄉"] },
  { upper: "又送王孫去", lower: "萋萋滿別情", wrong: ["萋萋滿別意", "萋萋滿別心", "萋萋滿別緒"] },
  { upper: "慈母手中線", lower: "遊子身上衣", wrong: ["遊子身上衫", "遊子身上袍", "遊子身上服"] },
  { upper: "臨行密密縫", lower: "意恐遲遲歸", wrong: ["意恐遲遲回", "意恐遲遲返", "意恐遲遲還"] },
  { upper: "誰言寸草心", lower: "報得三春暉", wrong: ["報得三春恩", "報得三春情", "報得三春愛"] },
  { upper: "少小離家老大回", lower: "鄉音無改鬢毛衰", wrong: ["鄉音無改鬢毛白", "鄉音無改鬢毛蒼", "鄉音無改鬢毛灰"] },
  { upper: "兒童相見不相識", lower: "笑問客從何處來", wrong: ["笑問客從何處歸", "笑問客從何處回", "笑問客從何處返"] },
  { upper: "葡萄美酒夜光杯", lower: "欲飲琵琶馬上催", wrong: ["欲飲琵琶馬上急", "欲飲琵琶馬上促", "欲飲琵琶馬上趕"] },
  { upper: "醉臥沙場君莫笑", lower: "古來征戰幾人回", wrong: ["古來征戰幾人歸", "古來征戰幾人還", "古來征戰幾人返"] },
  { upper: "秦時明月漢時關", lower: "萬里長征人未還", wrong: ["萬里長征人未歸", "萬里長征人未回", "萬里長征人未返"] },
  { upper: "但使龍城飛將在", lower: "不教胡馬度陰山", wrong: ["不教胡馬度陰關", "不教胡馬度陰嶺", "不教胡馬度陰峰"] },
  { upper: "青海長雲暗雪山", lower: "孤城遙望玉門關", wrong: ["孤城遙望玉門山", "孤城遙望玉門峰", "孤城遙望玉門嶺"] },
  { upper: "黃沙百戰穿金甲", lower: "不破樓蘭終不還", wrong: ["不破樓蘭終不歸", "不破樓蘭終不回", "不破樓蘭終不返"] },
  { upper: "月黑雁飛高", lower: "單于夜遁逃", wrong: ["單于夜遁走", "單于夜遁離", "單于夜遁去"] },
  { upper: "欲將輕騎逐", lower: "大雪滿弓刀", wrong: ["大雪滿弓劍", "大雪滿弓矢", "大雪滿弓器"] },
  { upper: "林暗草驚風", lower: "將軍夜引弓", wrong: ["將軍夜拉弓", "將軍夜開弓", "將軍夜張弓"] },
  { upper: "平明尋白羽", lower: "沒在石稜中", wrong: ["沒在石縫中", "沒在石隙中", "沒在石間中"] },
  { upper: "大漠孤煙直", lower: "長河落日圓", wrong: ["長河落日方", "長河落日扁", "長河落日彎"] },
  { upper: "征蓬出漢塞", lower: "歸雁入胡天", wrong: ["歸雁入胡地", "歸雁入胡疆", "歸雁入胡域"] },
  { upper: "回樂峰前沙似雪", lower: "受降城外月如霜", wrong: ["受降城外月如雪", "受降城外月如銀", "受降城外月如冰"] },
  { upper: "不知何處吹蘆管", lower: "一夜征人盡望鄉", wrong: ["一夜征人盡望家", "一夜征人盡望故", "一夜征人盡望歸"] },
  { upper: "黃河遠上白雲間", lower: "一片孤城萬仞山", wrong: ["一片孤城萬仞峰", "一片孤城萬仞嶺", "一片孤城萬仞巒"] },
  { upper: "羌笛何須怨楊柳", lower: "春風不度玉門關", wrong: ["春風不度玉門山", "春風不度玉門峰", "春風不度玉門嶺"] },
  { upper: "獨在異鄉為異客", lower: "每逢佳節倍思親", wrong: ["每逢佳節倍思家", "每逢佳節倍思故", "每逢佳節倍思鄉"] },
  { upper: "遙知兄弟登高處", lower: "遍插茱萸少一人", wrong: ["遍插茱萸少一友", "遍插茱萸少一親", "遍插茱萸少一朋"] },
  { upper: "空山不見人", lower: "但聞人語響", wrong: ["但聞人語聲", "但聞人語音", "但聞人語響聲"] },
  { upper: "返景入深林", lower: "復照青苔上", wrong: ["復照青苔下", "復照青苔中", "復照青苔間"] },
  { upper: "空山新雨後", lower: "天氣晚來秋", wrong: ["天氣晚來春", "天氣晚來夏", "天氣晚來冬"] },
  { upper: "明月松間照", lower: "清泉石上流", wrong: ["清泉石上淌", "清泉石上湧", "清泉石上奔"] },
  { upper: "竹喧歸浣女", lower: "蓮動下漁舟", wrong: ["蓮動下漁船", "蓮動下漁艇", "蓮動下漁舫"] },
  { upper: "隨意春芳歇", lower: "王孫自可留", wrong: ["王孫自可住", "王孫自可居", "王孫自可留宿"] },
  { upper: "人閒桂花落", lower: "夜靜春山空", wrong: ["夜靜春山寂", "夜靜春山靜", "夜靜春山寧"] },
  { upper: "月出驚山鳥", lower: "時鳴春澗中", wrong: ["時鳴春澗間", "時鳴春澗裡", "時鳴春澗內"] },
  { upper: "木末芙蓉花", lower: "山中發紅萼", wrong: ["山中發紅花", "山中發紅蕾", "山中發紅苞"] },
  { upper: "澗戶寂無人", lower: "紛紛開且落", wrong: ["紛紛開且謝", "紛紛開且凋", "紛紛開且敗"] },
  { upper: "君自故鄉來", lower: "應知故鄉事", wrong: ["應知故鄉情", "應知故鄉人", "應知故鄉景"] },
  { upper: "來日綺窗前", lower: "寒梅著花未", wrong: ["寒梅著花開", "寒梅著花放", "寒梅著花綻"] },
  { upper: "移舟泊煙渚", lower: "日暮客愁新", wrong: ["日暮客愁深", "日暮客愁濃", "日暮客愁重"] },
  { upper: "野曠天低樹", lower: "江清月近人", wrong: ["江清月近客", "江清月近舟", "江清月近船"] },
  { upper: "春風又綠江南岸", lower: "明月何時照我還", wrong: ["明月何時照我歸", "明月何時照我回", "明月何時照我返"] },
  { upper: "京口瓜洲一水間", lower: "鐘山只隔數重山", wrong: ["鐘山只隔數重峰", "鐘山只隔數重嶺", "鐘山只隔數重巒"] },
  { upper: "牆角數枝梅", lower: "凌寒獨自開", wrong: ["凌寒獨自放", "凌寒獨自綻", "凌寒獨自開花"] },
  { upper: "遙知不是雪", lower: "為有暗香來", wrong: ["為有暗香至", "為有暗香到", "為有暗香飄"] },
  { upper: "爆竹聲中一歲除", lower: "春風送暖入屠蘇", wrong: ["春風送暖入屠城", "春風送暖入屠府", "春風送暖入屠鎮"] },
  { upper: "千門萬戶曈曈日", lower: "總把新桃換舊符", wrong: ["總把新桃換舊符紙", "總把新桃換舊符字", "總把新桃換舊符貼"] },
  { upper: "勝日尋芳泗水濱", lower: "無邊光景一時新", wrong: ["無邊光景一時鮮", "無邊光景一時美", "無邊光景一時好"] },
  { upper: "等閒識得東風面", lower: "萬紫千紅總是春", wrong: ["萬紫千紅總是花", "萬紫千紅總是景", "萬紫千紅總是色"] },
  { upper: "山外青山樓外樓", lower: "西湖歌舞幾時休", wrong: ["西湖歌舞幾時停", "西湖歌舞幾時止", "西湖歌舞幾時歇"] },
  { upper: "暖風熏得遊人醉", lower: "直把杭州作汴州", wrong: ["直把杭州作汴京", "直把杭州作汴都", "直把杭州作汴城"] },
  { upper: "死去元知萬事空", lower: "但悲不見九州同", wrong: ["但悲不見九州一", "但悲不見九州統", "但悲不見九州合"] },
  { upper: "王師北定中原日", lower: "家祭無忘告乃翁", wrong: ["家祭無忘告乃父", "家祭無忘告乃祖", "家祭無忘告乃親"] },
  { upper: "三萬里河東入海", lower: "五千仞岳上摩天", wrong: ["五千仞岳上摩雲", "五千仞岳上摩霄", "五千仞岳上摩空"] },
  { upper: "遺民淚盡胡塵裡", lower: "南望王師又一年", wrong: ["南望王師又一載", "南望王師又一歲", "南望王師又一春"] },
  { upper: "僵臥孤村不自哀", lower: "尚思為國戍輪台", wrong: ["尚思為國戍邊關", "尚思為國戍邊疆", "尚思為國戍邊塞"] },
  { upper: "夜闌臥聽風吹雨", lower: "鐵馬冰河入夢來", wrong: ["鐵馬冰河入夢中", "鐵馬冰河入夢裡", "鐵馬冰河入夢境"] },
  { upper: "莫笑農家臘酒渾", lower: "豐年留客足雞豚", wrong: ["豐年留客足雞鴨", "豐年留客足雞鵝", "豐年留客足雞魚"] },
  { upper: "山重水複疑無路", lower: "柳暗花明又一村", wrong: ["柳暗花明又一鎮", "柳暗花明又一鄉", "柳暗花明又一城"] },
  { upper: "簫鼓追隨春社近", lower: "衣冠簡樸古風存", wrong: ["衣冠簡樸古風在", "衣冠簡樸古風留", "衣冠簡樸古風有"] },
  { upper: "從今若許閒乘月", lower: "拄杖無時夜叩門", wrong: ["拄杖無時夜敲門", "拄杖無時夜推門", "拄杖無時夜開門"] },
  { upper: "畢竟西湖六月中", lower: "風光不與四時同", wrong: ["風光不與四時異", "風光不與四時別", "風光不與四時差"] },
  { upper: "接天蓮葉無窮碧", lower: "映日荷花別樣紅", wrong: ["映日荷花別樣美", "映日荷花別樣艷", "映日荷花別樣鮮"] },
  { upper: "應憐屐齒印蒼苔", lower: "小扣柴扉久不開", wrong: ["小扣柴扉久不啟", "小扣柴扉久不推", "小扣柴扉久不拉"] },
  { upper: "春色滿園關不住", lower: "一枝紅杏出牆來", wrong: ["一枝紅杏出牆外", "一枝紅杏出牆頭", "一枝紅杏出牆邊"] },
  { upper: "水光瀲灩晴方好", lower: "山色空濛雨亦奇", wrong: ["山色空濛雨亦美", "山色空濛雨亦妙", "山色空濛雨亦佳"] },
  { upper: "欲把西湖比西子", lower: "淡妝濃抹總相宜", wrong: ["淡妝濃抹總相配", "淡妝濃抹總相合", "淡妝濃抹總相稱"] },
  { upper: "橫看成嶺側成峰", lower: "遠近高低各不同", wrong: ["遠近高低各不一", "遠近高低各各異", "遠近高低各各別"] },
  { upper: "不識廬山真面目", lower: "只緣身在此山中", wrong: ["只緣身在此山裡", "只緣身在此山內", "只緣身在此山間"] },
  { upper: "梅子黃時日日晴", lower: "小溪泛盡卻山行", wrong: ["小溪泛盡卻山走", "小溪泛盡卻山遊", "小溪泛盡卻山逛"] },
  { upper: "綠陰不減來時路", lower: "添得黃鸝四五聲", wrong: ["添得黃鸝四五鳴", "添得黃鸝四五叫", "添得黃鸝四五啼"] },
  { upper: "泉眼無聲惜細流", lower: "樹陰照水愛晴柔", wrong: ["樹陰照水愛晴美", "樹陰照水愛晴好", "樹陰照水愛晴佳"] },
  { upper: "小荷才露尖尖角", lower: "早有蜻蜓立上頭", wrong: ["早有蜻蜓立上邊", "早有蜻蜓立上端", "早有蜻蜓立上面"] },
  { upper: "朱雀橋邊野草花", lower: "烏衣巷口夕陽斜", wrong: ["烏衣巷口夕陽落", "烏衣巷口夕陽沉", "烏衣巷口夕陽下"] },
  { upper: "舊時王謝堂前燕", lower: "飛入尋常百姓家", wrong: ["飛入尋常百姓屋", "飛入尋常百姓院", "飛入尋常百姓宅"] },
  { upper: "千山鳥飛絕", lower: "萬徑人蹤滅", wrong: ["萬徑人蹤無", "萬徑人蹤盡", "萬徑人蹤失"] },
  { upper: "孤舟蓑笠翁", lower: "獨釣寒江雪", wrong: ["獨釣寒江魚", "獨釣寒江水", "獨釣寒江月"] },
  { upper: "松下問童子", lower: "言師採藥去", wrong: ["言師採藥來", "言師採藥歸", "言師採藥回"] },
  { upper: "只在此山中", lower: "雲深不知處", wrong: ["雲深不知地", "雲深不知方", "雲深不知所"] },
  { upper: "向晚意不適", lower: "驅車登古原", wrong: ["驅車登古山", "驅車登古峰", "驅車登古嶺"] },
  { upper: "夕陽無限好", lower: "只是近黃昏", wrong: ["只是近黃昏時", "只是近黃昏刻", "只是近黃昏分"] },
  { upper: "白日依山盡", lower: "黃河入海流", wrong: ["黃河入海去", "黃河入海歸", "黃河入海回"] },
  { upper: "欲窮千里目", lower: "更上一層樓", wrong: ["更上一層高", "更上一層天", "更上一層山"] },
  { upper: "春眠不覺曉", lower: "處處聞啼鳥", wrong: ["處處聞鳥叫", "處處聞花香", "處處聞人聲"] },
  { upper: "夜來風雨聲", lower: "花落知多少", wrong: ["花落知幾多", "花落知多少朵", "花落知多少片"] }
];

// Generate random bot names
const generateBotNames = (count) => {
  const surnames = ["王", "李", "張", "劉", "陳", "楊", "黃", "趙", "吳", "周", "徐", "孫", "馬", "朱", "胡", "林", "郭", "何", "高", "羅"];
  const names = ["小明", "小華", "小美", "小強", "小芳", "小偉", "小玲", "小軍", "小紅", "小剛", "老師", "學生", "學者", "詩人"];
  const botNames = [];
  for (let i = 0; i < count; i++) {
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    const name = names[Math.floor(Math.random() * names.length)];
    botNames.push(`${surname}${name}_${Math.floor(Math.random() * 100)}`);
  }
  return botNames;
};

const PoetryRoyale = () => {
  const [gameState, setGameState] = useState('lobby'); // lobby, playing, gameOver, won
  const [playerName, setPlayerName] = useState('');
  const [currentRound, setCurrentRound] = useState(1);
  const [playerCount, setPlayerCount] = useState(100);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [timeLeft, setTimeLeft] = useState(5.5);
  const [activityFeed, setActivityFeed] = useState([]);
  const [botNames, setBotNames] = useState([]);
  const [botProgress, setBotProgress] = useState({}); // Track each bot's round progress
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [finalResults, setFinalResults] = useState(null); // Store final winner and leaderboard
  const [isSimulating, setIsSimulating] = useState(false); // Track if simulating final rounds
  const timerRef = useRef(null);
  const activityFeedRef = useRef(null);

  const ELIMINATION_RATE = 0.2; // 20% of bots eliminated each round

  // Simulate remaining game after player loses
  const simulateRemainingGame = useCallback(async () => {
    setIsSimulating(true);
    
    // Get current state values using functional updates
    let currentBotProgress = {};
    let currentBotNames = [];
    let currentPlayerCount = 0;
    let currentRoundValue = 0;
    
    setBotProgress(prev => {
      currentBotProgress = { ...prev };
      return prev;
    });
    setBotNames(prev => {
      currentBotNames = [...prev];
      return prev;
    });
    setPlayerCount(prev => {
      currentPlayerCount = prev;
      return prev;
    });
    currentRoundValue = currentRound;
    
    let round = currentRoundValue;
    const simulationActivities = [];
    
    // Continue until only one bot remains
    while (currentPlayerCount > 1 && Object.keys(currentBotProgress).length > 0) {
      round++;
      
      // Calculate how many bots to eliminate
      const botsToEliminate = Math.max(1, Math.floor((currentPlayerCount - 1) * ELIMINATION_RATE));
      const availableBots = currentBotNames.filter(name => currentBotProgress[name] !== undefined);
      const shuffledBots = [...availableBots].sort(() => Math.random() - 0.5);
      const botsToRemove = shuffledBots.slice(0, Math.min(botsToEliminate, shuffledBots.length));
      
      // Update progress for eliminated bots
      botsToRemove.forEach(botName => {
        const botCurrentRound = currentBotProgress[botName] || 0;
        simulationActivities.push(`${botName} 完成了第 ${botCurrentRound + 1} 關！`);
      });
      
      // Remove eliminated bots
      botsToRemove.forEach(bot => {
        delete currentBotProgress[bot];
        currentBotNames = currentBotNames.filter(name => name !== bot);
      });
      
      // Update remaining bots' progress
      Object.keys(currentBotProgress).forEach(botName => {
        currentBotProgress[botName] = (currentBotProgress[botName] || 0) + 1;
      });
      
      currentPlayerCount = Object.keys(currentBotProgress).length;
      
      // Add delay for visual effect
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Find the winner (should be exactly 1 bot remaining)
    const winner = Object.keys(currentBotProgress)[0];
    const winnerScore = currentBotProgress[winner] || 0;
    
    // Ensure final player count is at least 1 (the winner)
    const finalPlayerCount = Math.max(1, currentPlayerCount);
    
    // Create final leaderboard including player
    const finalLeaderboard = [
      { name: playerName, score: currentRoundValue - 1, isPlayer: true },
      ...Object.entries(currentBotProgress).map(([name, score]) => ({
        name,
        score,
        isPlayer: false
      }))
    ].sort((a, b) => b.score - a.score);
    
    setFinalResults({
      winner: winner || null,
      winnerScore: winnerScore,
      finalLeaderboard: finalLeaderboard,
      finalRound: round
    });
    
    // Add simulation activities to feed
    setActivityFeed(prev => [...prev, ...simulationActivities]);
    setBotProgress(currentBotProgress);
    setPlayerCount(finalPlayerCount);
    setIsSimulating(false);
  }, [botProgress, botNames, playerCount, currentRound, playerName]);

  const loadNewQuestion = () => {
    let availableQuestions = POETRY_PAIRS.filter((_, index) => !usedQuestions.includes(index));
    if (availableQuestions.length === 0) {
      availableQuestions = POETRY_PAIRS;
      setUsedQuestions([]);
    }
    
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const question = availableQuestions[randomIndex];
    const actualIndex = POETRY_PAIRS.indexOf(question);
    setUsedQuestions(prev => [...prev, actualIndex]);
    
    // Shuffle options
    const options = [question.lower, ...question.wrong].sort(() => Math.random() - 0.5);
    setCurrentQuestion({ ...question, options });
    setTimeLeft(5.5);
  };

  // Initialize game
  useEffect(() => {
    if (gameState === 'playing') {
      const names = generateBotNames(99);
      setBotNames(names);
      // Initialize bot progress (all start at round 0)
      const initialProgress = {};
      names.forEach(name => {
        initialProgress[name] = 0;
      });
      setBotProgress(initialProgress);
      setPlayerCount(100);
      setCurrentRound(1);
      setActivityFeed([]);
      setUsedQuestions([]);
      loadNewQuestion();
    }
  }, [gameState]);

  // Timer countdown
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 0.1);
      }, 100);
    } else if (gameState === 'playing' && timeLeft <= 0) {
      setGameState('gameOver');
      // Start simulation after state update
      setTimeout(() => {
        simulateRemainingGame();
      }, 100);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [gameState, timeLeft, simulateRemainingGame]);

  // Auto-scroll activity feed
  useEffect(() => {
    if (activityFeedRef.current) {
      activityFeedRef.current.scrollTop = activityFeedRef.current.scrollHeight;
    }
  }, [activityFeed]);


  const handleAnswer = (answer) => {
    if (answer === currentQuestion.lower) {
      // Correct answer - player advances
      const nextRound = currentRound + 1;
      setCurrentRound(nextRound);
      
      // Eliminate bots and check win condition
      setPlayerCount(prevCount => {
        const botsToEliminate = Math.max(1, Math.floor((prevCount - 1) * ELIMINATION_RATE));
        const newPlayerCount = Math.max(1, prevCount - botsToEliminate);
        
        // Update bot progress and generate activity feed
        const availableBots = botNames.filter(name => botProgress[name] !== undefined);
        const shuffledBots = [...availableBots].sort(() => Math.random() - 0.5);
        const botsToRemove = shuffledBots.slice(0, Math.min(botsToEliminate, shuffledBots.length));
        
        const newActivities = [];
        
        // Get current progress before updates
        const currentProgress = { ...botProgress };
        
        // Add activities for eliminated bots
        botsToRemove.forEach(botName => {
          const botCurrentRound = currentProgress[botName] || 0;
          const activities = [
            `完成了第 ${botCurrentRound + 1} 關！`,
            `成功通過第 ${botCurrentRound + 1} 關！`,
            `答對了第 ${botCurrentRound + 1} 關！`,
            `完成了第 ${botCurrentRound + 1} 關挑戰！`
          ];
          const activity = activities[Math.floor(Math.random() * activities.length)];
          newActivities.push(`${botName} ${activity}`);
        });
        
        // Add activities for remaining bots (showing their progress)
        const remainingBots = availableBots.filter(bot => !botsToRemove.includes(bot));
        // Show progress for some remaining bots (random selection)
        const botsToShowProgress = remainingBots.slice(0, Math.min(3, remainingBots.length));
        botsToShowProgress.forEach(botName => {
          const botCurrentRound = currentProgress[botName] || 0;
          const newRound = botCurrentRound + 1;
          if (Math.random() > 0.5) { // 50% chance to show
            newActivities.push(`${botName} 正在進行第 ${newRound} 關`);
          }
        });
        
        // Update remaining bots' progress
        setBotProgress(prev => {
          const updated = { ...prev };
          botsToRemove.forEach(bot => delete updated[bot]);
          Object.keys(updated).forEach(botName => {
            if (!botsToRemove.includes(botName)) {
              updated[botName] = (updated[botName] || 0) + 1;
            }
          });
          return updated;
        });
        
        setActivityFeed(prev => [...prev, ...newActivities]);
        
        // Check win condition
        if (newPlayerCount <= 1) {
          setTimeout(() => setGameState('won'), 500);
        } else {
          loadNewQuestion();
        }
        
        return newPlayerCount;
      });
    } else {
      // Wrong answer - Game Over, but continue simulation
      setGameState('gameOver');
      simulateRemainingGame();
    }
  };


  const startGame = () => {
    if (playerName.trim()) {
      setGameState('playing');
    }
  };

  const resetGame = () => {
    setGameState('lobby');
    setCurrentRound(1);
    setPlayerCount(100);
    setActivityFeed([]);
    setUsedQuestions([]);
    setFinalResults(null);
    setIsSimulating(false);
  };

  if (gameState === 'lobby') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center p-4">
        <div className="bg-white/90 border-4 border-blue-300 rounded-2xl p-8 max-w-md w-full shadow-2xl">
          <h1 className="text-5xl font-bold text-blue-600 mb-2 text-center">詩詞捉迷藏</h1>
          <p className="text-purple-500 text-center mb-6 text-lg font-semibold">Poetry Hide and Seek</p>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 text-sm font-semibold">輸入你的名字</label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && startGame()}
              className="w-full px-4 py-3 bg-white border-2 border-blue-400 rounded-lg text-gray-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
              placeholder="你的名字..."
              autoFocus
            />
          </div>

          <div className="bg-gradient-to-r from-yellow-100 to-pink-100 border-2 border-yellow-300 rounded-lg p-4 mb-6">
            <p className="text-gray-700 text-sm mb-2">🎉 遊戲公告：</p>
            <p className="text-blue-600 font-semibold text-lg">99 位玩家已加入</p>
            <p className="text-gray-600 text-xs mt-2">總共：100 位玩家</p>
          </div>

          <button
            onClick={startGame}
            disabled={!playerName.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            開始遊戲 🎮
          </button>

          <p className="text-gray-600 text-xs mt-4 text-center">
            成為最後一個玩家即可獲得學者獎盃 🏆
          </p>
        </div>
      </div>
    );
  }

  if (gameState === 'gameOver') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-300 via-pink-300 to-yellow-300 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/95 border-4 border-orange-400 rounded-2xl p-8 shadow-2xl mb-4 text-center">
            <div className="text-6xl mb-4">😊</div>
            <h1 className="text-5xl font-bold text-orange-500 mb-4">繼續加油！</h1>
            <p className="text-gray-700 text-xl mb-2">玩家：<span className="text-purple-600 font-bold">{playerName}</span></p>
            <p className="text-gray-600 mb-4">你完成了 {currentRound - 1} 關！</p>
            
            {isSimulating && (
              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-4">
                <p className="text-blue-600 font-semibold">正在模擬剩餘遊戲...</p>
                <p className="text-gray-600 text-sm">其他玩家繼續比賽中...</p>
              </div>
            )}
            
            {finalResults && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-lg p-4 mb-4">
                <h2 className="text-2xl font-bold text-yellow-600 mb-2">🏆 最終獲勝者</h2>
                <p className="text-gray-800 text-lg font-semibold">{finalResults.winner}</p>
                <p className="text-gray-600">完成了 {finalResults.winnerScore} 關！</p>
                <p className="text-gray-500 text-sm mt-2">總共進行了 {finalResults.finalRound} 關</p>
              </div>
            )}
          </div>
          
          {/* Final Leaderboard */}
          {finalResults && (
            <div className="bg-white/95 border-4 border-green-400 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-3xl font-bold text-green-600 mb-4 text-center">最終排行榜 📊</h2>
              <div className="max-h-[500px] overflow-y-auto space-y-2">
                {finalResults.finalLeaderboard.map((player, index) => {
                  const rank = index + 1;
                  const isTopThree = rank <= 3;
                  const isCurrentPlayer = player.isPlayer;
                  
                  return (
                    <div
                      key={player.name}
                      className={`${
                        isCurrentPlayer
                          ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400'
                          : isTopThree
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300'
                          : 'bg-gray-50 border border-gray-200'
                      } rounded-lg p-3`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="text-gray-600 font-bold text-lg w-8">
                            {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}.`}
                          </span>
                          <span className={`${
                            isCurrentPlayer ? 'text-orange-700' : 'text-gray-700'
                          } font-semibold`}>
                            {player.name}
                            {isCurrentPlayer && ' (你)'}
                          </span>
                        </div>
                        <span className={`${
                          isCurrentPlayer ? 'text-orange-600' : isTopThree ? 'text-purple-600' : 'text-gray-600'
                        } font-bold text-lg`}>{player.score} 關</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          <div className="text-center mt-4">
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              再試一次 ✨
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'won') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-300 flex items-center justify-center p-4">
        <div className="bg-white/95 border-4 border-yellow-400 rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-5xl font-bold text-yellow-500 mb-4">恭喜你！</h1>
          <p className="text-gray-700 text-xl mb-2">玩家：<span className="text-purple-600 font-bold">{playerName}</span></p>
          <p className="text-gray-600 mb-4">你獲得了</p>
          <p className="text-3xl font-bold text-yellow-500 mb-6">學者獎盃 🎓</p>
          <p className="text-gray-600 mb-6">你是最後一個玩家！完成了 {currentRound} 關！</p>
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-500 hover:to-pink-500 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            再玩一次 🎉
          </button>
        </div>
      </div>
    );
  }

  // Playing state
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="bg-white/90 border-4 border-blue-400 rounded-xl p-4 shadow-lg">
            <p className="text-blue-600 font-bold text-sm">第 {currentRound} 關</p>
            <p className="text-gray-700 text-xs">玩家：<span className="text-purple-600 font-semibold">{playerName}</span></p>
          </div>
          <div className="bg-white/90 border-4 border-purple-400 rounded-xl p-4 shadow-lg">
            <p className="text-purple-600 font-bold text-sm">剩餘玩家</p>
            <p className="text-blue-600 text-2xl font-bold">{playerCount}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Main Arena */}
          <div className="lg:col-span-3">
            <div className="bg-white/95 border-4 border-blue-400 rounded-2xl p-8 min-h-[500px] flex flex-col items-center justify-center shadow-2xl">
              {/* Timer Bar */}
              <div className="w-full max-w-2xl mb-8">
                <div className="bg-gray-200 h-6 rounded-full overflow-hidden border-2 border-blue-300 shadow-inner">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-100 rounded-full"
                    style={{ width: `${(timeLeft / 5.5) * 100}%` }}
                  />
                </div>
                <p className="text-gray-700 text-center mt-2 text-sm font-semibold">時間：{timeLeft.toFixed(1)} 秒</p>
              </div>

              {/* Question */}
              {currentQuestion && (
                <div className="w-full max-w-2xl">
                  <div className="bg-gradient-to-r from-yellow-100 to-pink-100 border-4 border-yellow-400 rounded-xl p-6 mb-6 shadow-lg">
                    <p className="text-purple-600 text-sm mb-2 font-semibold">上句：</p>
                    <p className="text-gray-800 text-3xl font-bold text-center">{currentQuestion.upper}</p>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className="w-full bg-white hover:bg-blue-50 border-4 border-blue-300 hover:border-purple-400 rounded-xl p-4 text-gray-800 text-left transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg font-medium"
                      >
                        <span className="font-bold text-blue-600">{String.fromCharCode(65 + index)}. </span>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Leaderboard Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/95 border-4 border-green-400 rounded-xl p-4 h-[500px] flex flex-col shadow-lg">
              <h3 className="text-green-600 font-bold mb-2 text-sm">即時排行榜 📊</h3>
              <p className="text-gray-600 text-xs mb-2">共 {playerCount} 位玩家</p>
              <div className="flex-1 overflow-y-auto space-y-1" style={{ scrollbarWidth: 'thin' }}>
                {(() => {
                  // Combine player and bots, then sort by score
                  const playerScore = currentRound - 1;
                  const allPlayers = [
                    { name: playerName, score: playerScore, isPlayer: true },
                    ...Object.entries(botProgress).map(([name, score]) => ({
                      name,
                      score,
                      isPlayer: false
                    }))
                  ].sort((a, b) => b.score - a.score);
                  
                  const playerRank = allPlayers.findIndex(p => p.isPlayer) + 1;
                  
                  return (
                    <>
                      {/* Player's rank indicator */}
                      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 rounded-lg p-2 mb-2 sticky top-0 z-10">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-600 font-bold">👑</span>
                            <span className="text-gray-800 font-semibold text-xs">{playerName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-orange-600 font-bold text-xs">第 {playerRank} 名</span>
                            <span className="text-orange-600 font-bold text-sm">{playerScore} 關</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* All players sorted by score */}
                      {allPlayers.map((player, index) => {
                        const rank = index + 1;
                        const isTopThree = rank <= 3;
                        const isCurrentPlayer = player.isPlayer;
                        
                        if (isCurrentPlayer) return null; // Already shown above
                        
                        return (
                          <div
                            key={player.name}
                            className={`${
                              isTopThree
                                ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-300'
                                : 'bg-gray-50 border border-gray-200'
                            } rounded-lg p-2`}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-500 text-xs font-bold w-6">
                                  {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}.`}
                                </span>
                                <span className="text-gray-700 text-xs truncate max-w-[90px]">{player.name}</span>
                              </div>
                              <span className={`${
                                isTopThree ? 'text-purple-600' : 'text-gray-600'
                              } font-bold text-xs`}>{player.score} 關</span>
                            </div>
                          </div>
                        );
                      })}
                      
                      {allPlayers.length === 0 && (
                        <p className="text-gray-500 text-xs text-center mt-4">載入中...</p>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Activity Feed Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/95 border-4 border-pink-400 rounded-xl p-4 h-[500px] flex flex-col shadow-lg">
              <h3 className="text-pink-600 font-bold mb-3 text-sm">活動動態 🎉</h3>
              <div
                ref={activityFeedRef}
                className="flex-1 overflow-y-auto space-y-2"
                style={{ scrollbarWidth: 'thin' }}
              >
                {activityFeed.length === 0 ? (
                  <p className="text-gray-500 text-xs">還沒有活動...</p>
                ) : (
                  activityFeed.map((activity, index) => {
                    const isProgress = activity.includes('正在進行');
                    return (
                      <div
                        key={index}
                        className={`${
                          isProgress 
                            ? 'bg-gradient-to-r from-green-50 to-blue-50 border border-green-300' 
                            : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'
                        } rounded-lg p-2 text-xs text-gray-700`}
                      >
                        <span className={isProgress ? 'text-green-500' : 'text-yellow-500'}>
                          {isProgress ? '🎯' : '✨'}
                        </span> {activity}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoetryRoyale;

