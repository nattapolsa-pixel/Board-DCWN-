/* ============================================================
   PTG DISTRIBUTION CENTER - UNIFIED APPLICATION SCRIPT
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // ─── Employee Database (from บันทึกเวลาทำงาน sheet) ────────
  // Format: { "รหัสพนักงาน": { name: "ชื่อ-นามสกุล", role: "หน้าที่รับผิดชอบ" } }
  const EMPLOYEES = {
    "10090620": { name: "นางสาวณัฐชนก พองผลา",       role: "Safety" },
    "171080":   { name: "น.ส.จิราวรรณ ทิพย์แสง",      role: "Team lead" },
    "62004512": { name: "น.ส.สุภาพร คงเยือกเย็น",     role: "Support Officer" },
    "10094096": { name: "นายณัฐพล สง่าศรี",           role: "Support Officer" },
    "187887":   { name: "น.ส.วันดี คงแสงพันธ์",       role: "Support Officer" },
    "10029696": { name: "นางสาวสุดารัตน์ หิรัญคำ",    role: "Support Officer" },
    "62003655": { name: "น.ส.สุธาวัลย์ บุญรอด",       role: "Support Officer" },
    "10120209": { name: "นางสาวเอวารินทร์ บุญทา",     role: "Support Officer" },
    "10109480": { name: "นางสาวอินทิรา ชูอินทร์",     role: "Support Officer" },
    "10109479": { name: "นางสาวสุดา พรหมสุรินทร์",    role: "Support Officer" },
    "181723":   { name: "น.ส.สุจิตรา บัวผัน",         role: "Support Officer" },
    "10104361": { name: "น.ส.พัชรี พิมพา",            role: "Support Officer" },
    "10104362": { name: "น.ส.ศุภนิดา ทองคำ",          role: "HR" },
    "10107242": { name: "นายเบญจรงค์ เขตจัตุรัส",     role: "Support Officer" },
    "10107243": { name: "นางสาวสุวนันท์ ทับละคร",     role: "Support Officer" },
    "607621":   { name: "น.ส.สุภาพร สาระโอด",         role: "Inventory" },
    "10016177": { name: "น.ส.วิจิตรา เย็นใจ",         role: "Inventory" },
    "10130088": { name: "นางสาวพัชรี ดวงประสาท",      role: "Inventory" },
    "10151778": { name: "นาย รชต ค่ายสงคราม",         role: "Inventory" },
    "10137616": { name: "นางสาวปรายฟ้า ริศบุก",       role: "Inventory" },
    "10145197": { name: "นายณภัทร ฐิตวัฒนพงศ์",       role: "Inventory" },
    "10103101": { name: "นางสาวสุธาลินี ชลสินธุ์",    role: "Inventory" },
    "10048839": { name: "นายเดชชัย สุขพุดซา",         role: "Inventory" },
    "10148703": { name: "นางสาวธนนันท์ นาคเงิน",      role: "Inventory" },
    "10145213": { name: "นางสาวจินดา เกษรบัวทอง",     role: "HR" },
    "63001650": { name: "น.ส.จันทร์สุดา แสงงาม",      role: "Maid" },
    "10084412": { name: "Ms. Moe Moe Lwin",           role: "Maid" },
    "10092024": { name: "Ms.Aye Mi Lwin",             role: "Maid" },
    "617345":   { name: "น.ส.รุ่งฟ้า มูลหิรัญ",       role: "Team lead" },
    "10030205": { name: "น.ส.บุษกร กัวประเสริฐ",      role: "Transport" },
    "612291":   { name: "น.ส.กมล ศรีสุวรรณ์",         role: "Transport" },
    "10101251": { name: "นางสาวอริศา เชยเดช",         role: "Transport" },
    "25135":    { name: "นางสาววัชราภรณ์ สรสร้อย",    role: "Transport" },
    "25107":    { name: "น.ส. สุธาสินี พนมเวช",        role: "Transport" },
    "25117":    { name: "นางสาวสายชล จันทร์ฮุน",      role: "Transport" },
    "574426":   { name: "น.ส.อมรรัตน์ จินตุลา",       role: "Team lead" },
    "10113171": { name: "นายศิรวีร์ อยู่สภาพร",       role: "Team lead" },
    "10148224": { name: "นางสาวอรอุมา เพียดี",        role: "Support Operation" },
    "10104811": { name: "นางสาวณัฐธิดา ทรงลำเจียก",   role: "Support Operation" },
    "63000171": { name: "น.ส.กาญจนา สวนทรัพย์",      role: "Picker" },
    "63002853": { name: "น.ส.สุพัฒ แทนคอน",           role: "Support Operation" },
    "606974":   { name: "นายธวัชชัย มิจินดา",         role: "Support Operation" },
    "10047430": { name: "นางสาวสมจิตร บุญชื่น",       role: "QA" },
    "10132713": { name: "นายทินกร พรหมอยู่",          role: "Picker New Store" },
    "63003952": { name: "น.ส.ณัฐนันท์ หินทอง",        role: "Picker New Store" },
    "10140284": { name: "นายอรรถพล เรืองเลี้ยง",      role: "Picker New Store" },
    "616933":   { name: "นายเด่นดนัย ดิถีกุล",        role: "Team lead" },
    "606970":   { name: "นายกำพล คุณหงษ์",            role: "Receiver" },
    "63002453": { name: "นายแสนภูมิ จิตหาญ",          role: "Receiver" },
    "10035244": { name: "น.ส.อนงค์นาถ มีอบ",          role: "Receiver" },
    "10073307": { name: "นายภูวไนย เผือดผุด",         role: "Receiver" },
    "10117884": { name: "นางสาวภัชราภรณ์ ปัตตังทานัง", role: "Receiver" },
    "10130092": { name: "นางสาวณัฐมณี สุวรรณกูฏ",     role: "Receiver" },
    "181807":   { name: "นายคำรณ เฟื่องดี",           role: "Team lead" },
    "63008771": { name: "น.ส.ทิวา แก้ววงศ์",          role: "Grouping" },
    "10048845": { name: "นางสาวพรกนก เอมสรรค์",       role: "Picker" },
    "10033622": { name: "น.ส.ขวัญหทัย บือกุศล",       role: "Picker New Store" },
    "10101261": { name: "นางสาวอุไรวรรณ คำเล็ก",      role: "Admin Operation" },
    "10118792": { name: "นายกัมพล ภูสระ",              role: "RT" },
    "10121554": { name: "นายนวพล สุขสำราญ",           role: "QA" },
    "10121556": { name: "น.ส.นรพร ไทยวัฒน์",          role: "Operation Outbound" },
    "10137358": { name: "นางสาวกุลนิษฐ์ ลี้รุ่งเรือง", role: "Operation Outbound" },
    "10127216": { name: "นายอัษฎาวุฒิ พงษ์สุวรรณ",   role: "Picker New Store" },
    "10134297": { name: "นายเฉลิมรัตน์ ฟักสกุล",      role: "Picker" },
    "10134535": { name: "นางสาววีนัสรินทร์ ใจเสงี่ยม", role: "Picker" },
    "10135288": { name: "นายขรรค์ชัย เชื้อเมืองพาน",  role: "QA" },
    "10135289": { name: "นายสิทธิชัย ชัยบอลล์",       role: "Picker" },
    "10145207": { name: "นางสาววรุณี วงษ์ศรี",        role: "Picker" },
    "10148786": { name: "นายปิยะ จุลศิริ",            role: "Pick to Sort" },
    "10033620": { name: "น.ส.จิราภรณ์ ภาคไพรศรี",     role: "Picker" },
    "10049807": { name: "น.ส.สุทธิชา นาแพง",          role: "QA" },
    "10107245": { name: "นางสาวปรีดาภรณ์ วรรณศรี",    role: "QA" },
    "10148702": { name: "นางสาววรรณษา บุญสุข",        role: "QA" },
    "10075368": { name: "นางสาวศิริภรณ์ บัวศิริ",     role: "Operation Outbound" },
    "63005635": { name: "นายทวี หงษ์จันทร์",          role: "Grouping" },
    "10062083": { name: "น.ส.เยาวลักษณ์ ปัดภัย",      role: "Picker" },
    "10101247": { name: "นางสาวอังคณา กัลยา",         role: "Admin Operation" },
    "10061681": { name: "น.ส.ทิพย์วัล เพชรวัน",       role: "QA" },
    "10101242": { name: "นางสาวธนัชชา ขันธะวิธิ",     role: "QA" },
    "176894":   { name: "นายอรรถพล จรดรัมย์",         role: "RT" },
    "614981":   { name: "นายปวิช ละออศรี",            role: "RT" },
    "10084375": { name: "Mr. Aung Ko Min",            role: "Picker" },
    "10084379": { name: "Mr. Aung Myo Htun",          role: "Picker" },
    "10084396": { name: "Mr. Wai Yan Htun",           role: "Picker" },
    "10084408": { name: "Ms. Chit Moe",               role: "Picker" },
    "10084402": { name: "Mr. Zaw Myo Naing",          role: "Picker" },
    "10084403": { name: "Mr. Zaw Lin Htet",           role: "Grouping" },
    "10084404": { name: "Mr. Zaw Thu Htet",           role: "Picker" },
    "10084393": { name: "Mr. Sa Ye Myint Zaw",        role: "Picker" },
    "10084400": { name: "Mr. Ye Min Oo",              role: "Picker" },
    "10084384": { name: "Mr. Khaing Nyein Toe",       role: "Picker" },
    "10084386": { name: "Mr. Kyaw Min Khant",         role: "Picker" },
    "10084401": { name: "Mr. Zin Myo Htet",          role: "Picker" },
    "10084392": { name: "Mr. Shwe Hla Win",           role: "Picker" },
    "10084409": { name: "Ms. Ei Thet Lwin",           role: "Picker" },
    "10084415": { name: "Ms. Phyu Pyar Lwin",         role: "Picker" },
    "MPPTG0431": { name: "นางสาวศศิธร อาระหัง",       role: "QA" },
    "MPPTG0459": { name: "นายทินกร เจริญชัย",         role: "Pick to Sort" },
    "MPPTG0505": { name: "นางสาวฉััตรวดี หนูแก้ว",    role: "Picker" },
    "MPPTG0495": { name: "นาย ธนะรัตต์ สราวรรณ",      role: "RT" },
    "10151690": { name: "นางสาวชนิภรณ์ หมื่นกล้า",    role: "Picker" },
    "10151692": { name: "นางสาวอุบล รื่นบุตร",        role: "Picker New Store" },
    "MPPTG0422": { name: "นางสาวพรธิตา วะหะรักษ์",    role: "QA" },
    "MPPTG0402": { name: "นายนวินธร แก้วเนตร",        role: "Grouping" },
    "10151693": { name: "นายอภิลักษณ์ บุญชัย",        role: "RT" },
    "MPPTG0319": { name: "นายอานนท์ สว่างนวล",        role: "RT" },
    "MPPTG0446": { name: "นางสาวชลลดา โปธาคำ",        role: "Maid" },
    "25057":    { name: "นางสาววัณณา อยู่พุ่ม",       role: "Housekeeper" },
    "25062":    { name: "นางสาวกิตยา แสงบุญ",         role: "Picker" },
    "25066":    { name: "นางสาวจันทร์เพ็ญ จันทร์ฉวี", role: "Housekeeper" },
    "25115":    { name: "นางสาวรัตนา อิทธิฤทธิพันธ์", role: "Picker" },
    "25088":    { name: "นางสาวเกศรา แก่นจันทร์",     role: "Picker" },
    "10104373": { name: "นายกรณ์ หมื่นแสน",           role: "Team lead" },
    "172731":   { name: "น.ส.วิภา หอมใจดี",           role: "QA" },
    "62001153": { name: "นายไพรัตน์ เชิดเพ็ชรรัตน์",  role: "Picker" },
    "10051008": { name: "นายทวีวุฒิ พวงมาลัย",        role: "QA" },
    "172730":   { name: "น.ส.วิมลณัฐ พลายยงค์",       role: "Picker" },
    "10101257": { name: "นางสาวฉันทนา แซ่เล้า",       role: "Picker" },
    "10101330": { name: "นางสาวทิพวรรณ ศรีมุลตรี",    role: "Picker" },
    "10132721": { name: "นางสาวพิชญ์สินี มาเจริญ",    role: "QA" },
    "10133873": { name: "นายวุฒิศักดิ์ สวามิ",        role: "Picker" },
    "10135968": { name: "นายธวัฒน์ พงษ์โสภณ",         role: "Grouping" },
    "10148699": { name: "นายจิรายุทธ ศรีกงพาน",       role: "Pick to Sort" },
    "10148947": { name: "นางสาวสุทธิษา สวัสดิผล",     role: "Picker" },
    "10148948": { name: "นายคมกริช วระสีหา",          role: "RT" },
    "10115282": { name: "นางสาวศิริญญา เสริมขุนทด",   role: "Operation Outbound" },
    "10048840": { name: "นางสาวเบญจมาศ ทองนอก",       role: "Picker" },
    "10101264": { name: "นางสาวปุณิกา แสงเพชร",       role: "QA" },
    "10148705": { name: "นางสาวน้ำฝน สิลาโส",         role: "QA" },
    "10101269": { name: "นางสาวอัจฉรา เรืองฤทธิ์",    role: "QA" },
    "10104814": { name: "นางสาวสุภาพร ชาญครไทย",      role: "QA" },
    "10103254": { name: "นางสาวสุชญา เวียงเหล็ก",     role: "Picker" },
    "10148807": { name: "นางสาวกรรณิกา คอกสี",        role: "QA" },
    "10080236": { name: "นายนิธาน จิวาลักษณ์",        role: "Grouping" },
    "10143726": { name: "นางสาวศิริลักษณ์ อุ่นอ้วน",  role: "Operation Outbound" },
    "10101238": { name: "นายพลศิษฎ์ ชาสำโรง",         role: "RT" },
    "172729":   { name: "นายสุริยันต์ พลายยงค์",      role: "RT" },
    "10101260": { name: "นายวัชรพล สมบุตร์",          role: "RT" },
    "10115278": { name: "นายสุรชัย แซ่หยาง",          role: "RT" },
    "10057342": { name: "น.ส.ยุพาวะดี สุภาพ",         role: "Admin Operation" },
    "10101256": { name: "นางสาวจุฑารัตน์ จำใบ",       role: "Admin Operation" },
    "10084418": { name: "Ms. Tin Mar Aye",            role: "Picker" },
    "10084420": { name: "Ms. Thae Su Mar",            role: "Picker" },
    "10084421": { name: "Ms. Win Moh Moh Aung",       role: "Picker" },
    "10084395": { name: "Mr. Wai Phyo Aung",          role: "Picker" },
    "10084398": { name: "Mr. Yan Aung",               role: "Picker" },
    "10084382": { name: "Mr. Chit Hnaing Ko",         role: "Pick to sort" },
    "10084388": { name: "Mr. Myo Khaing",             role: "Picker" },
    "10084383": { name: "Mr. Kaung Khant Kyaw",       role: "Grouping" },
    "10084391": { name: "Mr. Si Thu Aung",            role: "Pick to sort" },
    "10084405": { name: "Mr. Zaw Ye Aung",            role: "Picker" },
    "10084417": { name: "Ms. Su Myat Paing",          role: "Picker" },
    "10084410": { name: "Ms. Nway Nway Htet Lwin",    role: "Picker" },
    "10084394": { name: "Mr. Tun Tun Lwin",           role: "Picker" },
    "10084407": { name: "Ms. Cho Pyone",              role: "Picker" },
    "MPPTG0248": { name: "นางสาวสุธาธิณี รอดแฟง",    role: "Picker" },
    "MPPTG0276": { name: "นางสาวขวัญฤทัย คำผุย",      role: "QA" },
    "MPPTG0407": { name: "นายศุปกรณ์ สาละมัย",        role: "Pick to sort" },
    "MPPTG0475": { name: "นายอณัฐชาญ นิลกล่ำ",        role: "RT" },
    "MPPTG0502": { name: "นายณัฐวุฒิ ฉิมมาทอง",       role: "Picker" },
    "MPPTG0508": { name: "นางสาววิสุตา เงินลุนปา",    role: "Picker" },
    "MPPTG0509": { name: "นายทรงยศ โทอาษา",          role: "Picker" },
    "MPPTG0510": { name: "นายวีรพล ศรีดี",            role: "Put-away" },
    "MPPTG0512": { name: "นางสาวจิรประภา สิงห์ป้อง",  role: "Picker" },
    "MPPTG0430": { name: "นายวิทวัส สุมารุ",          role: "Grouping" },
    "MPPTG0385": { name: "นายอิศรา นาคจันทร์",        role: "RT" },
    "MPPTG0153": { name: "น.ส.กัลยาณี เวียงคำ",       role: "Picker" },
    "25004":    { name: "นางสาวปัทมา ระวิชัย",        role: "Picker" },
    "25063":    { name: "นางสาวพิมห์หทัย เหมเวช",     role: "QA" },
    "25041":    { name: "นางสาวสุนันทา ช่องงาม",      role: "Put-away" },
    "25017":    { name: "นางสาวธัญรัตน์ เคียนตะขบ",   role: "Picker" },
    "25083":    { name: "นายองอาจ คล่องงาน",          role: "QA" },
    "25091":    { name: "นายตะวัน แสงทวี",            role: "Picker" },
    "25094":    { name: "นางสาวอรสา อรรถอินทรีย์",    role: "Picker" },
    "25092":    { name: "นายจิรายุุทธ์ คมสันต์",      role: "Picker" },
    "25124":    { name: "น.ส.สุชาดา ลิ้มเจริญ",       role: "Picker" },
    "25125":    { name: "น.ส.อุไร อุนารัมย์",         role: "Combine" },
    "25136":    { name: "นายดวง แซ่พ่าน",             role: "Picker" },
    "25138":    { name: "นางสาวพัชริี ไชยสาบ",        role: "Picker" },
    "25139":    { name: "นางสาวบุญช่วย อารีย์",       role: "Combine" },
    "MPPTG0515": { name: "นางสาวใกล้รุ่ง เสียดไพร",   role: "Picker" },
    "MPPTG0516": { name: "นางสาววรรณวลี เสียดไพร",    role: "Picker" },
    "MPPTG0519": { name: "นาย เสฏฐวุฒิ บุบผาสังข์",   role: "Picker" },
    "MPPTG0520": { name: "นาย อาทิตย์ พยับวิภาพงศ์",  role: "Picker" },
    "MPPTG0521": { name: "นางสาววิภา สนองสิทธิ์",     role: "Picker" },
    "25144":    { name: "นายนราวิชญ์ ไชยพันธ์",       role: "Picker" },
    "25145":    { name: "นางประทุม โฉมศรี",           role: "Picker" },
    "25149":    { name: "นางสาวธนัญญา ทิมิลกุล",      role: "Picker" },
    "MPPTG0522": { name: "นางสาว รูบียา เจ๊ะหะ",      role: "Picker" },
    "MPPTG0523": { name: "นาย พงศกร สระแก้ว",         role: "Picker" },
    "MPPTG0524": { name: "นายอานนท์ เสลิ้ม",         role: "Housekeeper" },
    "MPPTG0525": { name: "นายวันชนะ สีเพา",           role: "Picker" },
    "MPPTG0540": { name: "นายเมธิชัย นปภัชสุดา",      role: "Pick to Sort" },
    "MPPTG0536": { name: "นายวราวุธ หยดย้อย",         role: "Picker" },
    "MPPTG0537": { name: "นายเบญจพล บุญยก",           role: "Housekeeper" },
    "25151":    { name: "นางสาวเกวรินทร์ ป้องสุวรรณ", role: "Picker" },
    "MPPTG0539": { name: "นายกฤษณกร อัปมาทัง",        role: "Picker" },
    "25152":    { name: "นางสาวณัฐณิชา แสนประสิทธิื", role: "Maid" },
    "MPPTG0541": { name: "นางสาวราตรี ศรีนวล",        role: "Picker" },
    "25153":    { name: "นางสาวอติกานต์ เจริญชาญ",    role: "Picker" },
    "MPPTG0543": { name: "ฉวีวรรณ ขาวหุ่ม",           role: "Picker" },
    "MPPTG0544": { name: "สุรีวัลย์ ปันทะโชติ",       role: "Picker" },
    "MPPTG0545": { name: "น้ำฝน บุญน้อย",             role: "Picker" },
    "MPPTG0546": { name: "สุพัตร์ทรา สาระบัว",        role: "Picker" },
    "25154":    { name: "นางสาววาสนา บุญวิเศษ",       role: "Picker" },
    "25157":    { name: "นายสิริศักดิ์ จันทร์ดาประดิษฐ์", role: "Picker" },
    "MPPTG0548": { name: "นายวิชัย ชมพู",             role: "RT" },
    "MPPTG0549": { name: "นายพรพรหม แก้วโยธา",        role: "Picker" },
    "MPPTG0550": { name: "นายทวีศักดิ์ คล้ายเมือง",   role: "Picker" },
    "MPPTG0551": { name: "นางสาวนวลจันทร์ บูชาถ่ายเทศ", role: "Picker" },
    "MPPTG0552": { name: "นายวุฒิพร ชามั่ง",          role: "Picker" },
    "25159":    { name: "นายพงษ์รวี ขันธพิธี",        role: "Picker" },
    "25161":    { name: "นางสาวจำเนียร ขันธิรัตน์",   role: "Picker" },
    "MPPTG0553": { name: "นายพัทธพล แสงทอง",          role: "Picker" },
    "MPPTG0554": { name: "นงสาววราภรณ์ แสงทอง",       role: "Picker" },
    "25162":    { name: "นายพิสิษฐ์ อ่างบัว",         role: "Put-away" },
    "25163":    { name: "นางสาวกรชอร กล้าหาญ",        role: "Picker" },
    "25164":    { name: "นางสาวอลิษา สิงหา",          role: "Picker" },
    "10119311": { name: "นายณัฐพงศ์ ปฏิทัศน์",        role: "Head of DC" },
    "MPPTG0555": { name: "นายศรัญญู อดกลั้น",         role: "RT" },
  };

  // ─── Core DC Portal Systems (Exact User Mappings) ─────────────
  const DEFAULT_SYSTEMS = [
    // 1. DC Ops Monitor V2 (Operation, Transport)
    {
      id: "dc-ops-monitor",
      name: "DC Ops Monitor V2 (DC Project Dashboard)",
      url: "https://dc-ops-monitor-v2.onrender.com/",
      categories: ["operation", "transport"],
      categoryName: "Operation · Transport",
      theme: "green",
      icon: "📊",
      badge: "Live Monitor · BigQuery",
      desc: "ระบบมอนิเตอร์และวางแผน Wave งานคลังสินค้า ติดตามสถานะ Wave / Order และดูความคืบหน้าการทำงานรายวันแบบเรียลไทม์",
      isCustom: false
    },

    // 2. Pick Productivity V2 (Operation)
    {
      id: "pick-productivity",
      name: "Picker Productivity Dashboard V2",
      url: "https://nattapolsa-pixel.github.io/Productivity-Picker/",
      categories: ["operation"],
      categoryName: "Operation",
      theme: "light-green",
      icon: "⚡",
      badge: "Picker UPH · Real-time",
      desc: "แดชบอร์ดวัดประสิทธิภาพการหยิบสินค้าของพนักงาน (Picker) วิเคราะห์ความเร็ว UPH, สถิติรายบุคคล รายกะ และรายโซนในคลัง",
      isCustom: false
    },

    // 3. Pick to Sort Dashboard (Operation)
    {
      id: "pick-to-sort",
      name: "Pick to Sort Dashboard (Performance)",
      url: "https://nattapolsa-pixel.github.io/Pick-to-Sort/",
      categories: ["operation"],
      categoryName: "Operation",
      theme: "green",
      icon: "🔀",
      badge: "Pick to Sort · Station Live",
      desc: "แดชบอร์ดติดตามประสิทธิภาพการคัดแยกและจัดกลุ่มสินค้า (Pick to Sort) ตรวจสอบความเร็วการกระจายสินค้าเข้า Station",
      isCustom: false
    },

    // 4. Pro Scanner (Operation, Transport)
    {
      id: "pro-lpn-scanner",
      name: "Pro LPN Scanner (Warehouse Handheld)",
      url: "https://pro-warehouse.github.io/pro-scanner/",
      categories: ["operation", "transport"],
      categoryName: "Operation · Transport",
      theme: "purple",
      icon: "📱",
      badge: "Handheld & LPN · FastAPI",
      desc: "ระบบสแกนบาร์โค้ด LPN และ Tote บนมือถือหรือเครื่องยิง Handheld สำหรับตรวจนับสินค้า ยิง Wave ปิดกล่อง แยกสายรถจัดส่ง อัปเดตคลังทันที",
      isCustom: false
    },

    // 5. Damage 2026 (Damage)
    {
      id: "damage-system",
      name: "Damage 2026 Form & Dashboard",
      url: "https://nattapolsa-pixel.github.io/Damage/",
      categories: ["damage"],
      categoryName: "Damage",
      theme: "red",
      icon: "⚠️",
      badge: "Google Sheet · Photo Upload",
      desc: "ระบบบันทึกและรายงานสินค้าชำรุดเสียหาย สแกนบาร์โค้ด ถ่ายรูปหลักฐาน ระบุประเภทความเสียหาย และสรุป Dashboard วิเคราะห์สินค้าชำรุด",
      isCustom: false
    },

    // 6. DC New Store System (Operation, Transport)
    {
      id: "dc-new-store",
      name: "DC New Store System (Operation & Transport)",
      url: "https://script.google.com/a/macros/pt.co.th/s/AKfycby2IOrS6rWkt5GNka5H0yFiG-4228lInYqED_5_Zk_p53h-nJLKM2MXkiKYdKrKUArP/exec",
      categories: ["operation", "transport"],
      categoryName: "Operation · Transport",
      theme: "blue",
      icon: "🏬",
      badge: "New Store · Prep & Dispatch",
      desc: "ระบบบริหารจัดการและวางแผนการเตรียมสินค้า (Alloc/Pick/QC) รวมถึงสายรถจัดส่งสำหรับสาขาเปิดใหม่ (New Store)",
      isCustom: false
    },

    // 📦 INVENTORY (Coming Soon)
    {
      id: "inventory-coming-soon",
      name: "ระบบคลังสินค้า & สต็อก (Inventory System)",
      url: "#",
      categories: ["inventory"],
      categoryName: "Inventory",
      theme: "green",
      icon: "📦",
      badge: "Coming Soon ⏳",
      desc: "ระบบบริหารจัดการสต็อกและคลังสินค้า (Inventory) คลังสินค้า PTG วังน้อย กำลังอยู่ระหว่างการพัฒนาระบบ เร็วๆ นี้...",
      isComingSoon: true,
      isCustom: false
    },

    // 🦺 SAFETY (Coming Soon)
    {
      id: "safety-coming-soon",
      name: "ระบบความปลอดภัย & จป. (Safety System)",
      url: "#",
      categories: ["safety"],
      categoryName: "Safety",
      theme: "amber",
      icon: "🦺",
      badge: "Coming Soon ⏳",
      desc: "ระบบบริหารจัดการความปลอดภัยและสิ่งแวดล้อม คลังสินค้า PTG วังน้อย กำลังอยู่ระหว่างการพัฒนาระบบ เร็วๆ นี้...",
      isComingSoon: true,
      isCustom: false
    },

    // 👥 HR (Coming Soon)
    {
      id: "hr-coming-soon",
      name: "ระบบทรัพยากรบุคคล & เวลาทำงาน (HR System)",
      url: "#",
      categories: ["hr"],
      categoryName: "HR",
      theme: "purple",
      icon: "👥",
      badge: "Coming Soon ⏳",
      desc: "ระบบบริหารจัดการข้อมูลพนักงาน บันทึกเวลา และสถิติกะงาน (HR) อยู่ระหว่างการพัฒนาระบบ เร็วๆ นี้...",
      isComingSoon: true,
      isCustom: false
    },

    // 💬 CUSTOMER SERVICE (Coming Soon)
    {
      id: "cs-coming-soon",
      name: "ระบบบริการลูกค้า (Customer Service System)",
      url: "#",
      categories: ["cs"],
      categoryName: "Customer Service",
      theme: "blue",
      icon: "💬",
      badge: "Coming Soon ⏳",
      desc: "ระบบประสานงานและบริการลูกค้า/สาขา (Customer Service) อยู่ระหว่างการพัฒนาระบบ เร็วๆ นี้...",
      isComingSoon: true,
      isCustom: false
    }
  ];

  // ─── DOM Elements ──────────────────────────────────────────
  const loginForm         = document.getElementById("loginForm");
  const empInput          = document.getElementById("empId");
  const inputWrap         = document.getElementById("inputWrap");
  const empIdError        = document.getElementById("empIdError");
  const loginBtn          = document.getElementById("loginBtn");
  const toast             = document.getElementById("toast");
  const toastMsg          = document.getElementById("toastMsg");
  const accessOverlay     = document.getElementById("accessModalOverlay");
  const accessCloseBtn    = document.getElementById("accessModalClose");
  const deniedEmpIdEl     = document.getElementById("deniedEmpId");
  const empBadge          = document.getElementById("empBadge");
  const empBadgeLabel     = document.getElementById("empBadgeLabel");
  const logoutBtn         = document.getElementById("logoutBtn");

  // Board Elements
  const systemsGrid       = document.getElementById("systemsGrid");
  const boardSearchInput  = document.getElementById("boardSearchInput");
  const clearSearchBtn    = document.getElementById("clearSearchBtn");
  const quickDropZone     = document.getElementById("quickDropZone");
  const categoryPills     = document.querySelectorAll(".filter-pill");
  const countAllEl        = document.getElementById("countAll");
  const noResultsState    = document.getElementById("noResultsState");

  // Modal Elements
  const addModalOverlay   = document.getElementById("addSystemModalOverlay");
  const openAddModalBtn   = document.getElementById("openAddModalBtn");
  const closeAddModalBtn  = document.getElementById("closeAddModalBtn");
  const cancelAddModalBtn = document.getElementById("cancelAddModalBtn");
  const addSystemForm     = document.getElementById("addSystemForm");
  const sysUrlInput       = document.getElementById("sysUrl");
  const sysNameInput      = document.getElementById("sysName");
  const sysCategoryInput  = document.getElementById("sysCategory");
  const sysThemeInput     = document.getElementById("sysTheme");
  const sysDescInput      = document.getElementById("sysDesc");
  const sysBadgeInput     = document.getElementById("sysBadge");

  // ─── State ─────────────────────────────────────────────────
  let activeCategory = "all";
  let searchQuery = "";

  // ─── Systems Data Management (Local Storage) ───────────────
  function getCustomSystems() {
    try {
      const stored = localStorage.getItem("ptg_dc_custom_systems");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Error reading custom systems from localStorage", e);
      return [];
    }
  }

  function saveCustomSystems(systems) {
    try {
      localStorage.setItem("ptg_dc_custom_systems", JSON.stringify(systems));
    } catch (e) {
      console.error("Error saving custom systems to localStorage", e);
    }
  }

  function getFavorites() {
    try {
      const stored = localStorage.getItem("ptg_dc_favorites");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function toggleFavorite(id) {
    let favs = getFavorites();
    if (favs.includes(id)) {
      favs = favs.filter(f => f !== id);
    } else {
      favs.push(id);
    }
    try {
      localStorage.setItem("ptg_dc_favorites", JSON.stringify(favs));
    } catch (e) {}
    renderSystems();
  }

  function getAllSystems() {
    const custom = getCustomSystems();
    return [...DEFAULT_SYSTEMS, ...custom];
  }

  // Update Dynamic Pill Counters
  function updatePillCounters(allSystems) {
    const favs = getFavorites();
    const counts = {
      all: allSystems.length,
      inventory: 0,
      operation: 0,
      safety: 0,
      transport: 0,
      hr: 0,
      damage: 0,
      cs: 0,
      favorites: 0,
      custom: 0
    };

    allSystems.forEach(sys => {
      const cats = Array.isArray(sys.categories) ? sys.categories : (sys.category ? [sys.category] : []);
      cats.forEach(c => {
        if (counts[c] !== undefined) counts[c]++;
      });
      if (sys.isCustom) counts.custom++;
      if (favs.includes(sys.id)) counts.favorites++;
    });

    categoryPills.forEach(pill => {
      const cat = pill.getAttribute("data-category");
      if (!cat) return;
      const count = counts[cat] !== undefined ? counts[cat] : 0;
      const labelMap = {
        all: `ทั้งหมด (${count})`,
        inventory: `📦 Inventory (${count})`,
        operation: `⚡ Operation (${count})`,
        safety: `🦺 Safety (${count})`,
        transport: `🚚 Transport (${count})`,
        hr: `👥 HR (${count})`,
        damage: `⚠️ Damage (${count})`,
        cs: `💬 Customer Service (${count})`,
        favorites: `⭐ ติดดาว (${count})`,
        custom: `➕ เพิ่มเอง (${count})`
      };
      if (labelMap[cat]) {
        pill.textContent = labelMap[cat];
      }
    });
  }

  // ─── Render Systems Grid ───────────────────────────────────
  function renderSystems() {
    if (!systemsGrid) return;

    const rawSystems = getAllSystems();
    const favs = getFavorites();

    // 1. Identify categories that already have active (non-coming-soon) systems
    const activeCategories = new Set();
    rawSystems.forEach(sys => {
      if (!sys.isComingSoon) {
        const cats = Array.isArray(sys.categories) ? sys.categories : (sys.category ? [sys.category] : []);
        cats.forEach(c => activeCategories.add(c));
      }
    });

    // 2. Hide Coming Soon placeholders if the category already has active work
    const allSystems = rawSystems.filter(sys => {
      if (sys.isComingSoon) {
        const cats = Array.isArray(sys.categories) ? sys.categories : (sys.category ? [sys.category] : []);
        const hasRealSystem = cats.some(c => activeCategories.has(c));
        if (hasRealSystem) return false;
      }
      return true;
    });

    updatePillCounters(allSystems);

    // Filter systems
    const filtered = allSystems.filter(sys => {
      // Category match
      let matchCat = false;
      const cats = Array.isArray(sys.categories) ? sys.categories : (sys.category ? [sys.category] : []);
      if (activeCategory === "all") {
        matchCat = true;
      } else if (activeCategory === "favorites") {
        matchCat = favs.includes(sys.id);
      } else if (activeCategory === "custom") {
        matchCat = !!sys.isCustom;
      } else {
        matchCat = cats.includes(activeCategory);
      }

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q ||
        sys.name.toLowerCase().includes(q) ||
        sys.desc.toLowerCase().includes(q) ||
        (sys.categoryName && sys.categoryName.toLowerCase().includes(q)) ||
        sys.url.toLowerCase().includes(q) ||
        (sys.badge && sys.badge.toLowerCase().includes(q));

      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      systemsGrid.innerHTML = "";
      if (noResultsState) noResultsState.style.display = "block";
      return;
    }

    if (noResultsState) noResultsState.style.display = "none";

    systemsGrid.innerHTML = filtered.map(sys => {
      const isFav = favs.includes(sys.id);
      const primaryCat = (Array.isArray(sys.categories) ? sys.categories[0] : sys.category) || 'custom';
      return `
      <div class="system-card card-theme-${sys.theme || 'green'}" data-id="${sys.id}">
        <div>
          <div class="system-card-header">
            <div class="system-icon-wrap">${sys.icon || '🔗'}</div>
            <div class="system-header-right">
              <button class="star-btn ${isFav ? 'starred' : ''}" data-star-id="${sys.id}" title="${isFav ? 'ยกเลิกติดดาว' : 'ติดดาวระบบนี้'}">
                <svg viewBox="0 0 24 24" fill="${isFav ? '#fbbf24' : 'none'}" stroke="${isFav ? '#f59e0b' : 'currentColor'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </button>
              <div class="system-badges-wrap">
                <span class="system-category-tag cat-${primaryCat}">${sys.categoryName || 'ทั่วไป'}</span>
                ${sys.badge ? `<span class="system-badge-tag">${sys.badge}</span>` : ''}
              </div>
            </div>
          </div>

          <div class="system-card-body">
            <h3 class="system-title">${sys.name}</h3>
            <p class="system-desc">${sys.desc}</p>
            ${sys.isComingSoon ? `
              <div class="system-url-box coming-soon-box">
                <span class="system-url-text">⏳ อยู่ระหว่างการพัฒนา (Under Development)</span>
              </div>
            ` : `
              <div class="system-url-box" title="${sys.url}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                <span class="system-url-text">${sys.url}</span>
              </div>
            `}
          </div>
        </div>

        <div class="system-card-footer">
          ${sys.isComingSoon ? `
            <button type="button" class="launch-btn btn-coming-soon" disabled title="ระบบอยู่ระหว่างการพัฒนา">
              <span>Coming Soon... ⏳</span>
            </button>
          ` : `
            <a href="${sys.url}" target="_blank" rel="noopener noreferrer" class="launch-btn" title="เปิดใช้งาน ${sys.name}">
              <span>เปิดใช้งานระบบ</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"/>
                <polyline points="7 7 17 7 17 17"/>
              </svg>
            </a>
          `}
          ${sys.isCustom ? `
            <button class="card-remove-btn" data-delete-id="${sys.id}" title="ลบระบบนี้ออกจากบอร์ด">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          ` : ''}
        </div>
      </div>
    `}).join("");

    // Attach Star listeners
    document.querySelectorAll(".star-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const id = btn.getAttribute("data-star-id");
        if (id) toggleFavorite(id);
      });
    });

    // Attach delete listeners for custom cards
    document.querySelectorAll(".card-remove-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const idToDelete = btn.getAttribute("data-delete-id");
        if (confirm("คุณต้องการลบระบบนี้ออกจากบอร์ดใช่หรือไม่?")) {
          const custom = getCustomSystems().filter(s => s.id !== idToDelete);
          saveCustomSystems(custom);
          renderSystems();
          showToast("ลบระบบออกจากบอร์ดเรียบร้อยแล้ว");
        }
      });
    });
  }

  // ─── Search & Category Filters ─────────────────────────────
  boardSearchInput?.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    if (clearSearchBtn) {
      clearSearchBtn.style.display = searchQuery ? "flex" : "none";
    }
    renderSystems();
  });

  clearSearchBtn?.addEventListener("click", () => {
    if (boardSearchInput) {
      boardSearchInput.value = "";
      searchQuery = "";
      clearSearchBtn.style.display = "none";
      renderSystems();
      boardSearchInput.focus();
    }
  });

  categoryPills.forEach(pill => {
    pill.addEventListener("click", () => {
      categoryPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeCategory = pill.getAttribute("data-category") || "all";
      renderSystems();
    });
  });

  // ─── Add Custom System Modal ───────────────────────────────
  function openAddModal(prefilledUrl = "") {
    if (addSystemForm) addSystemForm.reset();
    if (prefilledUrl && sysUrlInput) {
      sysUrlInput.value = prefilledUrl;
      // Auto deduce system name from URL domain
      try {
        const parsed = new URL(prefilledUrl);
        if (sysNameInput) {
          sysNameInput.value = `ระบบ (${parsed.hostname})`;
        }
      } catch (e) {
        // Not a valid URL yet
      }
    }
    addModalOverlay?.classList.add("show");
    setTimeout(() => {
      if (prefilledUrl && sysNameInput) {
        sysNameInput.focus();
      } else {
        sysUrlInput?.focus();
      }
    }, 200);
  }

  function closeAddModal() {
    addModalOverlay?.classList.remove("show");
  }

  openAddModalBtn?.addEventListener("click", () => openAddModal());
  closeAddModalBtn?.addEventListener("click", closeAddModal);
  cancelAddModalBtn?.addEventListener("click", closeAddModal);
  addModalOverlay?.addEventListener("click", (e) => {
    if (e.target === addModalOverlay) closeAddModal();
  });

  // ─── Quick Drop / Paste Link Feature ───────────────────────
  quickDropZone?.addEventListener("click", () => {
    const inputUrl = prompt("กรุณาวางหรือพิมพ์ลิงก์ URL ที่ต้องการเพิ่มเข้าบอร์ด:");
    if (inputUrl && inputUrl.trim()) {
      openAddModal(inputUrl.trim());
    }
  });

  // Drag and Drop URL onto quick drop zone
  quickDropZone?.addEventListener("dragover", (e) => {
    e.preventDefault();
    quickDropZone.classList.add("drag-active");
  });

  quickDropZone?.addEventListener("dragleave", () => {
    quickDropZone.classList.remove("drag-active");
  });

  quickDropZone?.addEventListener("drop", (e) => {
    e.preventDefault();
    quickDropZone.classList.remove("drag-active");
    const droppedText = e.dataTransfer.getData("text/plain") || e.dataTransfer.getData("text/uri-list");
    if (droppedText) {
      openAddModal(droppedText.trim());
    }
  });

  // Add System Form Submit
  addSystemForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = sysUrlInput?.value.trim();
    const name = sysNameInput?.value.trim();
    const cat = sysCategoryInput?.value || "custom";
    const rawOptionText = sysCategoryInput?.options[sysCategoryInput.selectedIndex]?.text || "ทั่วไป";
    // Clean label for badge
    const catName = rawOptionText.replace(/^[\p{Emoji}\s]+/u, '').replace(/\s*\(.*\)$/, '').trim() || rawOptionText;
    const theme = sysThemeInput?.value || "green";
    const desc = sysDescInput?.value.trim();
    const badge = sysBadgeInput?.value.trim() || "Custom System";

    if (!url || !name || !desc) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const newSys = {
      id: "custom-" + Date.now(),
      name: name,
      url: url,
      category: cat,
      categories: [cat],
      categoryName: catName,
      theme: theme,
      icon: "🌐",
      badge: badge,
      desc: desc,
      isCustom: true
    };

    const currentCustom = getCustomSystems();
    currentCustom.unshift(newSys);
    saveCustomSystems(currentCustom);

    closeAddModal();
    renderSystems();
    showToast(`เพิ่มระบบ "${name}" เรียบร้อยแล้ว 🎉`);
  });

  // ─── UI Helper Functions ───────────────────────────────────
  function showToast(msg) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2800);
  }

  function showError(msg) {
    if (!inputWrap || !empIdError) return;
    inputWrap.classList.add("error");
    empIdError.textContent = msg;
    empIdError.classList.add("show");
    empInput?.focus();
  }

  function clearError() {
    if (!inputWrap || !empIdError) return;
    inputWrap.classList.remove("error");
    empIdError.textContent = "";
    empIdError.classList.remove("show");
  }

  function setLoginLoading(isLoading) {
    if (!loginBtn) return;
    loginBtn.disabled = isLoading;
    loginBtn.classList.toggle("loading", isLoading);
  }

  // ─── Access Denied Modal Functions ─────────────────────────
  function showAccessDenied(empId) {
    if (deniedEmpIdEl) deniedEmpIdEl.textContent = empId || "—";
    accessOverlay?.classList.add("show");
    setTimeout(() => accessCloseBtn?.focus(), 250);
  }

  function hideAccessDenied() {
    accessOverlay?.classList.remove("show");
    setTimeout(() => empInput?.focus(), 200);
  }

  accessCloseBtn?.addEventListener("click", hideAccessDenied);
  accessOverlay?.addEventListener("click", (e) => {
    if (e.target === accessOverlay) hideAccessDenied();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (accessOverlay?.classList.contains("show")) hideAccessDenied();
      if (addModalOverlay?.classList.contains("show")) closeAddModal();
    }
  });

  // ─── SPA View Switcher ─────────────────────────────────────
  function showPortal(empId, empName, empRole) {
    document.body.classList.remove("is-login");
    document.body.classList.add("is-portal");

    if (empBadgeLabel) {
      if (empName) {
        empBadgeLabel.innerHTML = `<span class="badge-name">${empName}</span><span class="badge-role">${empRole || empId}</span>`;
      } else {
        empBadgeLabel.textContent = `EMP-${empId}`;
      }
    }
    if (empBadge) {
      empBadge.title = empName
        ? `${empId} · ${empName} · ${empRole}`
        : `รหัสพนักงาน: ${empId}`;
    }

    // Set greeting on home tab
    const homeWelcomeName = document.getElementById("homeWelcomeName");
    if (homeWelcomeName && empName) {
      homeWelcomeName.textContent = `ยินดีต้อนรับ, คุณ${empName}`;
    }

    // Default to Home tab
    setActiveTab("home");
    renderSystems();
  }

  function showLogin() {
    document.body.classList.remove("is-portal");
    document.body.classList.add("is-login");
    if (empInput) {
      empInput.value = "";
      setTimeout(() => empInput.focus(), 150);
    }
    clearError();
    setLoginLoading(false);
  }

  // ─── Initial Auth Check on Page Load ───────────────────────
  const storedEmpId   = sessionStorage.getItem("ptg_emp")      || localStorage.getItem("ptg_emp");
  const storedEmpName = sessionStorage.getItem("ptg_emp_name") || localStorage.getItem("ptg_emp_name");
  const storedEmpRole = sessionStorage.getItem("ptg_emp_role") || localStorage.getItem("ptg_emp_role");

  if (storedEmpId) {
    showPortal(storedEmpId, storedEmpName, storedEmpRole);
  } else {
    showLogin();
  }

  // ─── Login Form Submit Handler ─────────────────────────────
  empInput?.addEventListener("input", () => {
    if (inputWrap?.classList.contains("error")) clearError();
  });

  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    clearError();

    const rawVal = empInput ? empInput.value.trim() : "";
    const upperVal = rawVal.toUpperCase();

    // 1. Check empty
    if (!rawVal) {
      showError("กรุณากรอกรหัสพนักงาน");
      return;
    }

    // 2. Lookup employee in database
    const emp = EMPLOYEES[rawVal] || EMPLOYEES[upperVal];

    if (!emp) {
      showAccessDenied(rawVal);
      return;
    }

    // 3. Authenticated
    setLoginLoading(true);

    setTimeout(() => {
      const resolvedId = EMPLOYEES[rawVal] ? rawVal : upperVal;
      sessionStorage.setItem("ptg_emp", resolvedId);
      sessionStorage.setItem("ptg_emp_name", emp.name);
      sessionStorage.setItem("ptg_emp_role", emp.role);

      showToast(`ยินดีต้อนรับ ${emp.name} 🎉`);

      setTimeout(() => {
        showPortal(resolvedId, emp.name, emp.role);
      }, 700);
    }, 600);
  });

  // ─── Logout Handler ─────────────────────────────────────────
  logoutBtn?.addEventListener("click", () => {
    ["ptg_emp", "ptg_emp_name", "ptg_emp_role"].forEach((k) => {
      sessionStorage.removeItem(k);
      localStorage.removeItem(k);
    });
    showToast("ออกจากระบบเรียบร้อยแล้ว");
    setTimeout(() => {
      showLogin();
    }, 300);
  });

  // ─── Mobile Navigation Toggle ───────────────────────────────
  const menuToggle     = document.getElementById("menuToggle");
  const mobileMenu     = document.getElementById("mobileMenu");
  const navOverlay     = document.getElementById("navOverlay");
  const navLinks       = document.querySelectorAll(".nav-link");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  const tabPanes       = document.querySelectorAll(".tab-pane");

  function toggleMobileNav(forceState) {
    const isOpen = typeof forceState === "boolean"
      ? forceState
      : !mobileMenu?.classList.contains("open");
    menuToggle?.classList.toggle("open", isOpen);
    menuToggle?.setAttribute("aria-expanded", isOpen ? "true" : "false");
    mobileMenu?.classList.toggle("open", isOpen);
    navOverlay?.classList.toggle("show", isOpen);
  }

  menuToggle?.addEventListener("click", () => toggleMobileNav());
  navOverlay?.addEventListener("click", () => toggleMobileNav(false));

  // ─── Active Tab Switching ───────────────────────────────────
  function setActiveTab(tabId) {
    if (!tabId) return;

    // Toggle active on navbar links
    navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("data-tab") === tabId));
    mobileNavLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("data-tab") === tabId));

    // Toggle active on tab-pane contents
    tabPanes.forEach((pane) => {
      const isTarget = pane.id === `tabContent-${tabId}`;
      pane.classList.toggle("active", isTarget);
    });

    // Re-render systems if switching to systems board
    if (tabId === "systems") {
      renderSystems();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const tabId = link.getAttribute("data-tab");
      if (tabId) setActiveTab(tabId);
    });
  });

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const tabId = link.getAttribute("data-tab");
      if (tabId) {
        setActiveTab(tabId);
        toggleMobileNav(false);
      }
    });
  });

  // Home shortcuts to Systems Board
  document.getElementById("homeGoToSystemsBtn")?.addEventListener("click", () => setActiveTab("systems"));
  document.getElementById("homeHeroBtn")?.addEventListener("click", () => setActiveTab("systems"));
  document.getElementById("highlightOpsCard")?.addEventListener("click", () => setActiveTab("systems"));
  document.getElementById("highlightPickerCard")?.addEventListener("click", () => setActiveTab("systems"));
  document.getElementById("highlightScannerCard")?.addEventListener("click", () => setActiveTab("systems"));

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) toggleMobileNav(false);
  });
});

/* ─── HOME CALENDAR ENGINE ─────────────────────────────────────── */
(function() {
  // PTG Company Holidays 2026 (BE 2569)
  const PTG_HOLIDAYS = [
    { date: "2026-01-01", name: "วันขึ้นปีใหม่" },
    { date: "2026-03-03", name: "วันมาฆบูชา" },
    { date: "2026-04-06", name: "วันจักรี" },
    { date: "2026-04-13", name: "วันสงกรานต์" },
    { date: "2026-04-14", name: "วันสงกรานต์" },
    { date: "2026-04-15", name: "วันสงกรานต์" },
    { date: "2026-05-01", name: "วันแรงงานแห่งชาติ" },
    { date: "2026-05-04", name: "วันฉัตรมงคล" },
    { date: "2026-06-01", name: "ชดเชยวันวิสาขบูชา" },
    { date: "2026-06-03", name: "วันเฉลิมพระชนมพรรษา (ราชินี)" },
    { date: "2026-07-28", name: "วันเฉลิมพระชนมพรรษา (ร.10)" },
    { date: "2026-07-29", name: "วันอาสาฬหบูชา" },
    { date: "2026-08-12", name: "วันแม่แห่งชาติ" },
    { date: "2026-10-13", name: "วันนวมินทรมหาราช" },
    { date: "2026-10-23", name: "วันปิยมหาราช" },
    { date: "2026-12-05", name: "วันพ่อแห่งชาติ" },
    { date: "2026-12-10", name: "วันรัฐธรรมนูญ" },
    { date: "2026-12-31", name: "วันสิ้นปี" }
  ];

  const HOLIDAY_MAP = {};
  PTG_HOLIDAYS.forEach(h => { HOLIDAY_MAP[h.date] = h.name; });

  const TH_MONTHS = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
  const TH_DAYS_SHORT = ["อา","จ","อ","พ","พฤ","ศ","ส"];
  const TH_DAYS_FULL = ["วันอาทิตย์","วันจันทร์","วันอังคาร","วันพุธ","วันพฤหัสบดี","วันศุกร์","วันเสาร์"];

  function pad(n) { return String(n).padStart(2,"0"); }
  function dateKey(y,m,d) { return `${y}-${pad(m+1)}-${pad(d)}`; }

  let viewYear, viewMonth;
  const today = new Date();

  function initCalendar() {
    viewYear = today.getFullYear();
    viewMonth = today.getMonth();
    renderTodayStrip();
    renderCalendar();
    renderHolidayList();

    document.getElementById("calPrev")?.addEventListener("click", () => {
      viewMonth--;
      if (viewMonth < 0) { viewMonth = 11; viewYear--; }
      renderCalendar();
    });
    document.getElementById("calNext")?.addEventListener("click", () => {
      viewMonth++;
      if (viewMonth > 11) { viewMonth = 0; viewYear++; }
      renderCalendar();
    });
  }

  function renderTodayStrip() {
    const strip = document.getElementById("todayStrip");
    if (!strip) return;
    const todayKey = dateKey(today.getFullYear(), today.getMonth(), today.getDate());
    const isHoliday = !!HOLIDAY_MAP[todayKey];
    const dayName = TH_DAYS_FULL[today.getDay()];
    const dateStr = `${today.getDate()} ${TH_MONTHS[today.getMonth()]} ${today.getFullYear() + 543}`;

    strip.innerHTML = `
      <span class="today-strip-icon">📅</span>
      <div>
        <div class="today-strip-main">${dayName} ที่ ${dateStr}</div>
        <div class="today-strip-sub">วันทำงานศูนย์กระจายสินค้า PTG วังน้อย</div>
      </div>
      ${isHoliday ? `<div class="today-strip-holiday"><span class="hol-dot"></span> ${HOLIDAY_MAP[todayKey]}</div>` : ""}
    `;
  }

  function renderCalendar() {
    const label = document.getElementById("calMonthLabel");
    if (label) {
      label.innerHTML = `${TH_MONTHS[viewMonth]}<span class="cal-year-tag">พ.ศ. ${viewYear + 543} &nbsp;·&nbsp; ค.ศ. ${viewYear}</span>`;
    }

    const grid = document.getElementById("calGrid");
    if (!grid) return;

    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

    // Prev month fill
    const prevDays = new Date(viewYear, viewMonth, 0).getDate();

    let cells = "";

    // Leading empty cells from prev month
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = prevDays - i;
      cells += `<div class="cal-day other-month is-${["sun","","","","","","sat"][((firstDay - 1 - i) + 7) % 7] || "wd"}"><span class="cal-day-num">${d}</span></div>`;
    }

    // This month
    for (let d = 1; d <= daysInMonth; d++) {
      const thisDate = new Date(viewYear, viewMonth, d);
      const dow = thisDate.getDay();
      const key = dateKey(viewYear, viewMonth, d);
      const isToday = (d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear());
      const isHol = !!HOLIDAY_MAP[key];
      const isSun = dow === 0, isSat = dow === 6;

      let cls = "cal-day";
      if (isToday) cls += " is-today";
      if (isHol) cls += " is-holiday";
      if (isSun) cls += " is-sun";
      if (isSat) cls += " is-sat";

      const dot = isHol ? `<span class="cal-day-holiday-dot" title="${HOLIDAY_MAP[key]}"></span>` : "";
      cells += `<div class="${cls}" title="${isHol ? HOLIDAY_MAP[key] : ""}"><span class="cal-day-num">${d}</span>${dot}</div>`;
    }

    // Trailing empty cells
    const totalCells = firstDay + daysInMonth;
    const trailing = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let d = 1; d <= trailing; d++) {
      cells += `<div class="cal-day other-month"><span class="cal-day-num">${d}</span></div>`;
    }

    grid.innerHTML = cells;
  }

  function renderHolidayList() {
    const body = document.getElementById("holidayListBody");
    const sub = document.getElementById("holidayListSub");
    if (!body) return;

    const todayMs = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const remaining = PTG_HOLIDAYS.filter(h => new Date(h.date).getTime() >= todayMs).length;
    if (sub) sub.textContent = `เหลืออีก ${remaining} วัน ในปี ${today.getFullYear() + 543}`;

    let html = "";
    PTG_HOLIDAYS.forEach((h, i) => {
      const d = new Date(h.date);
      const dMs = d.getTime();
      const dayStr = `${d.getDate()} ${TH_MONTHS[d.getMonth()]}`;
      const dowStr = TH_DAYS_FULL[d.getDay()];
      const isToday = (dMs === todayMs);
      const isPast = dMs < todayMs;
      // Next upcoming holiday
      const isNext = !isPast && PTG_HOLIDAYS.slice(0, i).every(hh => new Date(hh.date).getTime() < todayMs);

      let rowCls = "holiday-row";
      let badge = "";
      if (isToday) { rowCls += " is-today-row"; badge = `<span class="holiday-badge-today">วันนี้!</span>`; }
      else if (isPast) { rowCls += " is-past"; badge = `<span class="holiday-badge-past">ผ่านแล้ว</span>`; }
      else if (isNext) { rowCls += " is-upcoming"; badge = `<span class="holiday-badge-soon">ถัดไป</span>`; }

      html += `
        <div class="${rowCls}">
          <span class="holiday-num">${i + 1}</span>
          <div class="holiday-date-block">
            <span class="holiday-date">${dayStr}</span>
            <span class="holiday-dow">${dowStr}</span>
          </div>
          <span class="holiday-name">${h.name}</span>
          ${badge}
        </div>`;
    });
    body.innerHTML = html;
  }

  // Init when portal view is ready (after login)
  const origLogin = window._calendarInitDone;
  if (!origLogin) {
    window._calendarInitDone = true;
    // Watch for portal view appearing
    const observer = new MutationObserver(() => {
      const calGrid = document.getElementById("calGrid");
      if (calGrid && !calGrid._initialized) {
        calGrid._initialized = true;
        initCalendar();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true, attributeFilter: ["class"] });
    // Also try immediately in case already visible
    if (document.getElementById("calGrid")) initCalendar();
  }
})();

/* ─── ANNOUNCEMENT BOARD ENGINE ────────────────────────────────── */
(function() {
  const STORAGE_KEY = "ptg_dc_announcements";
  const TYPE_CONFIG = {
    general:     { label: "📋 ทั่วไป",    icon: "📋" },
    urgent:      { label: "🚨 ด่วน!",     icon: "🚨" },
    event:       { label: "🎉 กิจกรรม",  icon: "🎉" },
    maintenance: { label: "🔧 แจ้งซ่อม", icon: "🔧" },
    holiday:     { label: "🏖️ วันหยุด",  icon: "🏖️" }
  };

  const DEFAULT_ANNOUNCEMENTS = [
    {
      id: "ann-init-1",
      title: "ยินดีต้อนรับสู่ DC Central Portal (ศูนย์กลางระบบคลังสินค้า PTG วังน้อย)",
      content: "ศูนย์กลางรวบรวมระบบปฏิบัติการ แดชบอร์ดมอนิเตอร์ Wave, Picker UPH, Scanner Handheld และบอร์ดติดตามงาน DC ทั้งหมดไว้ในที่เดียว เพื่อการทำงานที่สะดวก รวดเร็ว และมีประสิทธิภาพสูงสุด",
      author: "Admin DC",
      type: "general",
      pinned: true,
      createdAt: Date.now() - 3600000 * 2
    },
    {
      id: "ann-init-2",
      title: "ประกาศรอบเวลาการทำงานและกะงาน DC วังน้อย",
      content: "ขอให้พนักงานทุกท่านตรวจสอบรอบเวลาการเข้างานและกะการปฏิบัติงานตามตารางอย่างเคร่งครัด หากมีข้อสอบถามสามารถติดต่อหัวหน้างานประจำโซนได้ทันที",
      author: "ฝ่ายปฏิบัติการ DC",
      type: "event",
      pinned: false,
      createdAt: Date.now() - 3600000 * 5
    },
    {
      id: "ann-init-3",
      title: "มาตรการความปลอดภัยและตรวจเช็คอุปกรณ์ก่อนเริ่มงาน",
      content: "สวมใส่อุปกรณ์ PPE ครบถ้วน (หมวก, เสื้อสะท้อนแสง, รองเท้าเซฟตี้) และตรวจเช็คสภาพรถโฟล์กลิฟต์/แฮนด์ลิฟต์ทุกครั้งก่อนเริ่มปฏิบัติหน้าที่",
      author: "จป. ปฏิบัติการ",
      type: "urgent",
      pinned: false,
      createdAt: Date.now() - 3600000 * 12
    }
  ];

  function getAnnouncements() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ANNOUNCEMENTS));
        return DEFAULT_ANNOUNCEMENTS;
      }
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ANNOUNCEMENTS));
        return DEFAULT_ANNOUNCEMENTS;
      }
      return parsed;
    } catch(e) {
      return DEFAULT_ANNOUNCEMENTS;
    }
  }
  function saveAnnouncements(arr) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }
    catch(e) {}
  }

  function formatDateTime(ts) {
    const d = new Date(ts);
    const months = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];
    const h = String(d.getHours()).padStart(2,"0");
    const m = String(d.getMinutes()).padStart(2,"0");
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()+543}, ${h}:${m} น.`;
  }

  function renderAnnouncements() {
    const feed = document.getElementById("announceFeed");
    const empty = document.getElementById("announceEmpty");
    if (!feed) return;

    let list = getAnnouncements();
    // Pinned first, then by date desc
    list = list.sort((a,b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return b.createdAt - a.createdAt;
    });

    if (list.length === 0) {
      feed.style.display = "none";
      if (empty) empty.style.display = "flex";
      return;
    }
    feed.style.display = "flex";
    if (empty) empty.style.display = "none";

    feed.innerHTML = list.map(item => {
      const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.general;
      const badgeCls = `announce-badge badge-${item.type || "general"}`;
      return `
        <div class="announce-card type-${item.type || "general"} ${item.pinned ? "is-pinned" : ""}" data-id="${item.id}">
          <div class="announce-card-icon">${cfg.icon}</div>
          <div class="announce-card-body">
            <div class="announce-card-top">
              <div class="announce-card-title">${escHtml(item.title)}</div>
              <span class="${badgeCls}">${cfg.label}</span>
              ${item.pinned ? `<span class="announce-card-pin" title="ปักหมุด">📌</span>` : ""}
            </div>
            <div class="announce-card-content">${escHtml(item.content)}</div>
            <div class="announce-card-meta">
              ${item.author ? `<span class="announce-card-author">👤 ${escHtml(item.author)}</span>` : ""}
              <span class="announce-card-date">🕐 ${formatDateTime(item.createdAt)}</span>
            </div>
          </div>
          <div class="announce-card-actions">
            <button class="announce-action-btn" data-edit="${item.id}" title="แก้ไข">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button class="announce-action-btn del" data-delete="${item.id}" title="ลบ">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
      `;
    }).join("");

    // Edit & Delete listeners
    feed.querySelectorAll("[data-edit]").forEach(btn => {
      btn.addEventListener("click", () => openEditModal(btn.getAttribute("data-edit")));
    });
    feed.querySelectorAll("[data-delete]").forEach(btn => {
      btn.addEventListener("click", () => deleteAnnouncement(btn.getAttribute("data-delete")));
    });
  }

  function escHtml(str) {
    return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  }

  function openModal(editId) {
    const overlay = document.getElementById("announceModalOverlay");
    const titleEl = document.getElementById("announceModalTitle");
    const submitLabel = document.getElementById("announceSubmitLabel");
    const editIdEl = document.getElementById("announceEditId");
    const titleInput = document.getElementById("announceTitle");
    const contentInput = document.getElementById("announceContent");
    const authorInput = document.getElementById("announceAuthor");
    const pinCb = document.getElementById("announcePin");
    const typeInput = document.getElementById("announceType");
    const typeSelector = document.getElementById("announceTypeSelector");

    if (editId) {
      const list = getAnnouncements();
      const item = list.find(x => x.id === editId);
      if (!item) return;
      titleEl.textContent = "แก้ไขประกาศ";
      submitLabel.textContent = "บันทึกการแก้ไข";
      editIdEl.value = editId;
      titleInput.value = item.title;
      contentInput.value = item.content;
      authorInput.value = item.author || "";
      pinCb.checked = !!item.pinned;
      typeInput.value = item.type || "general";
      typeSelector.querySelectorAll(".announce-type-btn").forEach(b => {
        b.classList.toggle("active", b.getAttribute("data-type") === (item.type || "general"));
      });
      updateCharCount();
    } else {
      titleEl.textContent = "โพสต์ประกาศใหม่";
      submitLabel.textContent = "โพสต์ประกาศ";
      editIdEl.value = "";
      document.getElementById("announceForm").reset();
      typeInput.value = "general";
      typeSelector.querySelectorAll(".announce-type-btn").forEach(b => {
        b.classList.toggle("active", b.getAttribute("data-type") === "general");
      });
      updateCharCount();
    }
    overlay.style.display = "flex";
    titleInput.focus();
  }

  function closeModal() {
    const overlay = document.getElementById("announceModalOverlay");
    if (overlay) overlay.style.display = "none";
  }

  function openEditModal(id) { openModal(id); }

  function deleteAnnouncement(id) {
    if (!confirm("ต้องการลบประกาศนี้ใช่ไหม?")) return;
    let list = getAnnouncements().filter(x => x.id !== id);
    saveAnnouncements(list);
    renderAnnouncements();
  }

  function updateCharCount() {
    const content = document.getElementById("announceContent");
    const hint = document.getElementById("announceCharCount");
    if (content && hint) hint.textContent = `${content.value.length} / 500 ตัวอักษร`;
  }

  function initAnnounceBoard() {
    renderAnnouncements();

    // Open modal
    document.getElementById("openAnnounceModalBtn")?.addEventListener("click", () => openModal(null));
    document.getElementById("closeAnnounceModalBtn")?.addEventListener("click", closeModal);
    document.getElementById("cancelAnnounceBtn")?.addEventListener("click", closeModal);

    // Close on overlay click
    document.getElementById("announceModalOverlay")?.addEventListener("click", e => {
      if (e.target.id === "announceModalOverlay") closeModal();
    });

    // Type selector
    document.getElementById("announceTypeSelector")?.addEventListener("click", e => {
      const btn = e.target.closest(".announce-type-btn");
      if (!btn) return;
      document.querySelectorAll(".announce-type-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("announceType").value = btn.getAttribute("data-type");
    });

    // Char counter
    document.getElementById("announceContent")?.addEventListener("input", updateCharCount);

    // Form submit
    document.getElementById("announceForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const title = document.getElementById("announceTitle")?.value.trim();
      const content = document.getElementById("announceContent")?.value.trim();
      const author = document.getElementById("announceAuthor")?.value.trim();
      const pinned = document.getElementById("announcePin")?.checked;
      const type = document.getElementById("announceType")?.value || "general";
      const editId = document.getElementById("announceEditId")?.value;

      if (!title || !content) return;

      let list = getAnnouncements();
      if (editId) {
        list = list.map(x => x.id === editId ? { ...x, title, content, author, pinned, type, updatedAt: Date.now() } : x);
      } else {
        list.unshift({ id: "ann-" + Date.now(), title, content, author, pinned, type, createdAt: Date.now() });
      }
      saveAnnouncements(list);
      renderAnnouncements();
      closeModal();
    });
  }

  // Init when home tab content is visible
  const boardObserver = new MutationObserver(() => {
    const feed = document.getElementById("announceFeed");
    if (feed && !feed._announceInit) {
      feed._announceInit = true;
      initAnnounceBoard();
    }
  });
  boardObserver.observe(document.body, { childList: true, subtree: true, attributeFilter: ["class", "style"] });
  if (document.getElementById("announceFeed")) initAnnounceBoard();
})();
