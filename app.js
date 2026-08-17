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

/* ─── ANNOUNCEMENT BOARD ENGINE (Email News & Month Filter) ───────── */
(function() {
  // v6 resets every earlier announcement cache, including email-synced items.
  const STORAGE_KEY = "ptg_dc_announcements_v6";
  const TYPE_CONFIG = {
    general:     { label: "📋 ข่าวสารทั่วไป",               icon: "📋" },
    urgent:      { label: "🚨 ด่วนที่สุด / แจ้งเตือนสำคัญ",    icon: "🚨" },
    event:       { label: "🎉 กิจกรรม / ข่าวประชาสัมพันธ์",   icon: "🎉" },
    maintenance: { label: "🔧 แจ้งซ่อมบำรุง / ปิดปรับปรุงระบบ", icon: "🔧" },
    holiday:     { label: "🏖️ วันหยุด / สวัสดิการพนักงาน",   icon: "🏖️" }
  };

  const TH_MONTHS_SHORT = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

  function encodeSvg(svg) {
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg.trim());
  }

  // High Quality SVG Posters & Banners for PT Happyworkplace & DC Broadcasts (URL-Encoded for 100% browser compatibility)
  const BANNER_EP41_SMOKING = encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 620" width="800" height="620">
    <defs>
      <linearGradient id="bgSmoke" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#14532d"/>
        <stop offset="50%" stop-color="#166534"/>
        <stop offset="100%" stop-color="#15803d"/>
      </linearGradient>
      <linearGradient id="redBadge" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#dc2626"/>
        <stop offset="100%" stop-color="#b91c1c"/>
      </linearGradient>
      <linearGradient id="blueBadge" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0284c7"/>
        <stop offset="100%" stop-color="#0369a1"/>
      </linearGradient>
    </defs>
    <rect width="800" height="620" fill="url(#bgSmoke)" rx="18"/>
    <circle cx="730" cy="80" r="140" fill="rgba(255,255,255,0.06)"/>
    <circle cx="80" cy="540" r="160" fill="rgba(255,255,255,0.05)"/>
    <rect x="30" y="24" width="740" height="70" rx="14" fill="rgba(255,255,255,0.15)"/>
    <text x="50" y="54" font-family="Noto Sans Thai, sans-serif" font-size="15" font-weight="700" fill="#bbf7d0">PT HAPPYWORKPLACE · PT HEALTH ME</text>
    <text x="50" y="78" font-family="Noto Sans Thai, sans-serif" font-size="20" font-weight="800" fill="#ffffff">💚 มุม "รัก" สุขภาพ EP.41 · ประจำเดือนสิงหาคม 2569</text>
    <rect x="670" y="38" width="80" height="40" rx="10" fill="#22c55e"/>
    <text x="710" y="64" font-family="Noto Sans Thai, sans-serif" font-size="16" font-weight="800" fill="#ffffff" text-anchor="middle">EP.41</text>
    <rect x="30" y="110" width="355" height="390" rx="14" fill="#ffffff"/>
    <rect x="30" y="110" width="355" height="48" rx="14" fill="url(#redBadge)"/>
    <text x="207" y="142" font-family="Noto Sans Thai, sans-serif" font-size="16" font-weight="800" fill="#ffffff" text-anchor="middle">⚠️ ยิ่งสูบ ยิ่งพัง! 10 อันตรายจากนิโคติน</text>
    <text x="48" y="180" font-family="Noto Sans Thai, sans-serif" font-size="13" font-weight="700" fill="#991b1b">1. ทำลายปอด หลอดลมอักเสบเรื้อรัง</text>
    <text x="48" y="210" font-family="Noto Sans Thai, sans-serif" font-size="13" font-weight="700" fill="#991b1b">2. หัวใจเต้นเร็วผิดปกติ ความดันพุ่งสูง</text>
    <text x="48" y="240" font-family="Noto Sans Thai, sans-serif" font-size="13" font-weight="700" fill="#991b1b">3. เกิดภาวะหลอดเลือดแดงแข็งตัว</text>
    <text x="48" y="270" font-family="Noto Sans Thai, sans-serif" font-size="13" font-weight="700" fill="#991b1b">4. เพิ่มความเสี่ยงโรคหลอดเลือดสมอง</text>
    <text x="48" y="300" font-family="Noto Sans Thai, sans-serif" font-size="13" font-weight="700" fill="#991b1b">5. ทำลายระบบประสาทส่วนกลาง</text>
    <text x="48" y="330" font-family="Noto Sans Thai, sans-serif" font-size="13" font-weight="700" fill="#991b1b">6. ลดระดับออกซิเจนในกระแสเลือด</text>
    <text x="48" y="360" font-family="Noto Sans Thai, sans-serif" font-size="13" font-weight="700" fill="#991b1b">7. กระตุ้นความเสี่ยงโรคเบาหวาน</text>
    <text x="48" y="390" font-family="Noto Sans Thai, sans-serif" font-size="13" font-weight="700" fill="#991b1b">8. ระบบภูมิคุ้มกันร่างกายบกพร่อง</text>
    <text x="48" y="420" font-family="Noto Sans Thai, sans-serif" font-size="13" font-weight="700" fill="#991b1b">9. เพิ่มความเสี่ยงโรคมะเร็งทุกชนิด</text>
    <text x="48" y="450" font-family="Noto Sans Thai, sans-serif" font-size="13" font-weight="700" fill="#991b1b">10. มีสารเสพติดรุนแรง เลิกยาก</text>
    <rect x="48" y="465" width="319" height="24" rx="6" fill="#fee2e2"/>
    <text x="207" y="482" font-family="Noto Sans Thai, sans-serif" font-size="11" font-weight="700" fill="#b91c1c" text-anchor="middle">🚫 ส่งผลกระทบทั้งผู้สูบและคนรอบข้าง</text>
    <rect x="415" y="110" width="355" height="390" rx="14" fill="#ffffff"/>
    <rect x="415" y="110" width="355" height="48" rx="14" fill="url(#blueBadge)"/>
    <text x="592" y="142" font-family="Noto Sans Thai, sans-serif" font-size="16" font-weight="800" fill="#ffffff" text-anchor="middle">☠️ 5 สารพิษ อันตรายในบุหรี่ไฟฟ้า</text>
    <text x="435" y="185" font-family="Noto Sans Thai, sans-serif" font-size="14" font-weight="800" fill="#0369a1">1. นิโคติน (Nicotine)</text>
    <text x="435" y="205" font-family="Noto Sans Thai, sans-serif" font-size="12" fill="#475569">สารเสพติดทำลายสมอง หัวใจ และระบบไหลเวียน</text>
    <text x="435" y="245" font-family="Noto Sans Thai, sans-serif" font-size="14" font-weight="800" fill="#0369a1">2. ฟอร์มาลดีไฮด์ (Formaldehyde)</text>
    <text x="435" y="265" font-family="Noto Sans Thai, sans-serif" font-size="12" fill="#475569">สารก่อมะเร็งในระบบทางเดินหายใจ</text>
    <text x="435" y="305" font-family="Noto Sans Thai, sans-serif" font-size="14" font-weight="800" fill="#0369a1">3. โพรไพลีนไกลคอล (Propylene Glycol)</text>
    <text x="435" y="325" font-family="Noto Sans Thai, sans-serif" font-size="12" fill="#475569">ระคายเคืองปอด ก่อโรคปอดอักเสบเฉียบพลัน</text>
    <text x="435" y="365" font-family="Noto Sans Thai, sans-serif" font-size="14" font-weight="800" fill="#0369a1">4. โลหะหนัก (Heavy Metals / Lead)</text>
    <text x="435" y="385" font-family="Noto Sans Thai, sans-serif" font-size="12" fill="#475569">ตะกั่ว นิเกิล สะสมในตับและไต</text>
    <text x="435" y="425" font-family="Noto Sans Thai, sans-serif" font-size="14" font-weight="800" fill="#0369a1">5. สารหนู (Arsenic)</text>
    <text x="435" y="445" font-family="Noto Sans Thai, sans-serif" font-size="12" fill="#475569">สารพิษทำลายเซลล์ เพิ่มความเสี่ยงมะเร็งปอด</text>
    <rect x="30" y="520" width="740" height="75" rx="14" fill="#ffffff"/>
    <rect x="45" y="535" width="160" height="45" rx="22" fill="#dc2626"/>
    <text x="125" y="563" font-family="Noto Sans Thai, sans-serif" font-size="18" font-weight="800" fill="#ffffff" text-anchor="middle">📞 สายด่วน 1600</text>
    <text x="225" y="552" font-family="Noto Sans Thai, sans-serif" font-size="14" font-weight="800" fill="#006837">สายด่วนเลิกบุหรี่ "อย่าปล่อยให้ควันจาง ทำลายชีวิตคุณให้หายไป"</text>
    <text x="225" y="576" font-family="Noto Sans Thai, sans-serif" font-size="12" fill="#64748b">แนะนำ! ดาวน์โหลด Persona Health แอปพลิเคชันประเมินสุขภาพพนักงาน PTG</text>
  </svg>`);

  const BANNER_PLEDGE_LENT = encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" width="800" height="360">
    <defs>
      <linearGradient id="gPledge" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#b45309"/>
        <stop offset="50%" stop-color="#d97706"/>
        <stop offset="100%" stop-color="#f59e0b"/>
      </linearGradient>
    </defs>
    <rect width="800" height="360" fill="url(#gPledge)" rx="16"/>
    <circle cx="700" cy="90" r="140" fill="rgba(255,255,255,0.08)"/>
    <text x="50" y="65" font-family="Noto Sans Thai, sans-serif" font-size="16" font-weight="700" fill="#fef3c7">PT HAPPYWORKPLACE · กิจกรรมเข้าพรรษา 2569</text>
    <text x="50" y="110" font-family="Noto Sans Thai, sans-serif" font-size="24" font-weight="800" fill="#ffffff">💛 เข้าพรรษา 16 วันแล้ว เป็นยังไงกันบ้าง?</text>
    <text x="50" y="155" font-family="Noto Sans Thai, sans-serif" font-size="18" font-weight="700" fill="#fffbeb">ขอเชิญเพื่อนๆ ชาว PTG ร่วมตั้งปณิธาน "ชนะแล้ว ชนะใจ เลิกเหล้า หยุดบุหรี่" ปี 4</text>
    <text x="50" y="200" font-family="Noto Sans Thai, sans-serif" font-size="14" fill="#fef9c3">✨ สร้างสุขภาพที่ดีให้ตนเอง ประหยัดค่าใช้จ่าย และมอบของขวัญล้ำค่าแก่ครอบครัว</text>
    <text x="50" y="230" font-family="Noto Sans Thai, sans-serif" font-size="14" fill="#fef9c3">🎁 ร่วมกิจกรรมรับของที่ระลึกพิเศษจากโครงการ Happy Workplace</text>
    <rect x="50" y="265" width="260" height="46" rx="23" fill="#ffffff"/>
    <text x="180" y="294" font-family="Noto Sans Thai, sans-serif" font-size="14.5" font-weight="800" fill="#b45309" text-anchor="middle">✍️ ร่วมตั้งปณิธานคลิกที่นี่</text>
    <text x="740" y="300" font-family="Noto Sans Thai, sans-serif" font-size="70" text-anchor="end">🧘‍♂️💛🍺🚫</text>
  </svg>`);

  const BANNER_MOTHER_DAY_2026 = encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" width="800" height="360">
    <defs>
      <linearGradient id="gMom" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0284c7"/>
        <stop offset="50%" stop-color="#0ea5e9"/>
        <stop offset="100%" stop-color="#ec4899"/>
      </linearGradient>
    </defs>
    <rect width="800" height="360" fill="url(#gMom)" rx="16"/>
    <circle cx="710" cy="90" r="140" fill="rgba(255,255,255,0.08)"/>
    <text x="50" y="65" font-family="Noto Sans Thai, sans-serif" font-size="16" font-weight="700" fill="#e0f2fe">PT HAPPYWORKPLACE · กิจกรรมวันแม่แห่งชาติ</text>
    <text x="50" y="110" font-family="Noto Sans Thai, sans-serif" font-size="25" font-weight="800" fill="#ffffff">💙 PT MOTHER DAY 2026 💙</text>
    <text x="50" y="155" font-family="Noto Sans Thai, sans-serif" font-size="18" font-weight="700" fill="#fdf2f8">กิจกรรมแบ่งปันช่วงเวลาดีๆ "เพราะทุกเวลากับคุณแม่ คือความทรงจำล้ำค่า"</text>
    <text x="50" y="200" font-family="Noto Sans Thai, sans-serif" font-size="14" fill="#f0fdf4">📸 ส่งรูปภาพช่วงเวลาดีๆ คู่กับคุณแม่ พร้อมคำบรรยายสั้นๆ ลุ้นรับของรางวัลสุดพิเศษ</text>
    <text x="50" y="230" font-family="Noto Sans Thai, sans-serif" font-size="14" fill="#f0fdf4">🗓️ ร่วมสนุกได้ตั้งแต่วันนี้ - 20 สิงหาคม 2569</text>
    <rect x="50" y="265" width="250" height="46" rx="23" fill="#ffffff"/>
    <text x="175" y="294" font-family="Noto Sans Thai, sans-serif" font-size="14.5" font-weight="800" fill="#0284c7" text-anchor="middle">🎁 ส่งรูปภาพลุ้นรับรางวัล</text>
    <text x="740" y="300" font-family="Noto Sans Thai, sans-serif" font-size="70" text-anchor="end">👩‍👧‍👦💙🌸</text>
  </svg>`);

  const BANNER_WORKSHOP_HEALTHME = encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" width="800" height="360">
    <defs>
      <linearGradient id="gWs" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#db2777"/>
        <stop offset="50%" stop-color="#e11d48"/>
        <stop offset="100%" stop-color="#f43f5e"/>
      </linearGradient>
    </defs>
    <rect width="800" height="360" fill="url(#gWs)" rx="16"/>
    <circle cx="690" cy="100" r="130" fill="rgba(255,255,255,0.08)"/>
    <text x="50" y="65" font-family="Noto Sans Thai, sans-serif" font-size="16" font-weight="700" fill="#fce7f3">PT HEALTH ME · WORKSHOP พิเศษ</text>
    <text x="50" y="110" font-family="Noto Sans Thai, sans-serif" font-size="24" font-weight="800" fill="#ffffff">🥰💖 WORKSHOP "สุขหมดสี่อก : มาลานารี"</text>
    <text x="50" y="155" font-family="Noto Sans Thai, sans-serif" font-size="18" font-weight="700" fill="#fff1f2">ชีวิตครอบครัวยุคใหม่ พร้อมใส่ใจสุขภาพคุณแม่และผู้หญิง</text>
    <text x="50" y="200" font-family="Noto Sans Thai, sans-serif" font-size="14" fill="#ffe4e6">🏥 เรียนรู้การตรวจคัดกรองสุขภาพสตรี และการปรับสมดุลกาย-ใจ</text>
    <text x="50" y="230" font-family="Noto Sans Thai, sans-serif" font-size="14" fill="#ffe4e6">📍 เข้าร่วมได้ทั้ง Onsite ณ อาคารปฏิบัติการ และ Online ผ่าน MS Teams</text>
    <rect x="50" y="265" width="230" height="46" rx="23" fill="#ffffff"/>
    <text x="165" y="294" font-family="Noto Sans Thai, sans-serif" font-size="14.5" font-weight="800" fill="#db2777" text-anchor="middle">📝 ลงทะเบียนล่วงหน้า</text>
    <text x="740" y="300" font-family="Noto Sans Thai, sans-serif" font-size="70" text-anchor="end">🌸👩‍⚕️💖</text>
  </svg>`);

  const BANNER_ALCOHOL = encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" width="800" height="360">
    <defs>
      <linearGradient id="gAlc" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#78350f"/>
        <stop offset="50%" stop-color="#9a3412"/>
        <stop offset="100%" stop-color="#c2410c"/>
      </linearGradient>
    </defs>
    <rect width="800" height="360" fill="url(#gAlc)" rx="16"/>
    <text x="50" y="65" font-family="Noto Sans Thai, sans-serif" font-size="16" font-weight="700" fill="#ffedd5">PT HAPPYWORKPLACE · สุขภาพพนักงาน</text>
    <text x="50" y="110" font-family="Noto Sans Thai, sans-serif" font-size="24" font-weight="800" fill="#ffffff">💚 มุม "รัก" สุขภาพ EP.38 : 🍺 โรคยอดฮิตจากฤทธิ์แอลกอฮอล์</text>
    <text x="50" y="155" font-family="Noto Sans Thai, sans-serif" font-size="17" font-weight="700" fill="#fed7aa">หายนะที่ควรระวัง! ภัยเงียบทำร้ายตับ สมอง และหลอดเลือด</text>
    <text x="50" y="200" font-family="Noto Sans Thai, sans-serif" font-size="14" fill="#ffedd5">1. ตับแข็งและไขมันพอกตับ  2. หลอดเลือดสมองตีบ  3. โรคกระเพาะอาหาร</text>
    <text x="50" y="230" font-family="Noto Sans Thai, sans-serif" font-size="14" fill="#ffedd5">📲 ประเมินความเสี่ยงสุขภาพผ่าน Persona Health</text>
    <rect x="50" y="265" width="230" height="46" rx="23" fill="#ffffff"/>
    <text x="165" y="294" font-family="Noto Sans Thai, sans-serif" font-size="14.5" font-weight="800" fill="#9a3412" text-anchor="middle">🍺 เลิกเหล้าวันนี้ เพื่อตับที่ดี</text>
    <text x="740" y="300" font-family="Noto Sans Thai, sans-serif" font-size="70" text-anchor="end">⚠️🍺🚫</text>
  </svg>`);

  const BANNER_EP40_MENTAL = encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" width="800" height="360">
    <defs>
      <linearGradient id="gMen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f766e"/>
        <stop offset="50%" stop-color="#0d9488"/>
        <stop offset="100%" stop-color="#14b8a6"/>
      </linearGradient>
    </defs>
    <rect width="800" height="360" fill="url(#gMen)" rx="16"/>
    <text x="50" y="65" font-family="Noto Sans Thai, sans-serif" font-size="16" font-weight="700" fill="#ccfbf1">PT HAPPYWORKPLACE · สุขภาพใจ</text>
    <text x="50" y="110" font-family="Noto Sans Thai, sans-serif" font-size="24" font-weight="800" fill="#ffffff">💚 มุม "รัก" สุขภาพ EP.40 : การดูแลกาย - ใจตนเอง ❤️</text>
    <text x="50" y="155" font-family="Noto Sans Thai, sans-serif" font-size="17" font-weight="700" fill="#e6fffa">สำหรับบุคคลทั่วไปที่รับรู้เหตุการณ์รุนแรงและข่าวสารเครียด</text>
    <text x="50" y="200" font-family="Noto Sans Thai, sans-serif" font-size="14" fill="#ccfbf1">1. จำกัดเวลาเสพข่าวสาร  2. ฝึกหายใจลึกๆ คลายกล้ามเนื้อ  3. พูดคุยกับเพื่อนร่วมงาน</text>
    <text x="50" y="230" font-family="Noto Sans Thai, sans-serif" font-size="14" fill="#ccfbf1">เพราะสุขภาพกาย-ใจของพนักงานเป็นสิ่งสำคัญที่สุด</text>
    <rect x="50" y="265" width="230" height="46" rx="23" fill="#ffffff"/>
    <text x="165" y="294" font-family="Noto Sans Thai, sans-serif" font-size="14.5" font-weight="800" fill="#0f766e" text-anchor="middle">❤️ ดูแลใจไปด้วยกัน</text>
    <text x="740" y="300" font-family="Noto Sans Thai, sans-serif" font-size="70" text-anchor="end">🧘‍♀️💚✨</text>
  </svg>`);

  const BANNER_IT = encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 320" width="800" height="320">
    <defs>
      <linearGradient id="gIT" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#312e81"/>
        <stop offset="50%" stop-color="#4338ca"/>
        <stop offset="100%" stop-color="#6366f1"/>
      </linearGradient>
    </defs>
    <rect width="800" height="320" fill="url(#gIT)" rx="16"/>
    <text x="50" y="75" font-family="Noto Sans Thai, sans-serif" font-size="24" font-weight="800" fill="#ffffff">🔧 IT &amp; WMS SYSTEM MAINTENANCE</text>
    <text x="50" y="125" font-family="Noto Sans Thai, sans-serif" font-size="19" font-weight="700" fill="#a5f3fc">ปรับปรุงเซิร์ฟเวอร์ WMS &amp; Wi-Fi โซน Picking คลังวังน้อย</text>
    <text x="50" y="170" font-family="Noto Sans Thai, sans-serif" font-size="14" fill="#e0e7ff">🗓️ วันอาทิตย์ที่ 23 สิงหาคม 2569 เวลา 01:00 - 04:00 น.</text>
    <rect x="50" y="235" width="230" height="42" rx="21" fill="#ffffff"/>
    <text x="165" y="262" font-family="Noto Sans Thai, sans-serif" font-size="13.5" font-weight="800" fill="#312e81" text-anchor="middle">💻 IT Operations Team</text>
    <text x="740" y="265" font-family="Noto Sans Thai, sans-serif" font-size="60" text-anchor="end">🖥️📡⚡</text>
  </svg>`);

  const BANNER_SAFETY = encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 320" width="800" height="320">
    <defs>
      <linearGradient id="gSafe" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#991b1b"/>
        <stop offset="50%" stop-color="#dc2626"/>
        <stop offset="100%" stop-color="#ea580c"/>
      </linearGradient>
    </defs>
    <rect width="800" height="320" fill="url(#gSafe)" rx="16"/>
    <text x="50" y="75" font-family="Noto Sans Thai, sans-serif" font-size="25" font-weight="800" fill="#ffffff">⚠️ SAFETY FIRST : ปลอดภัยไว้ก่อน</text>
    <text x="50" y="120" font-family="Noto Sans Thai, sans-serif" font-size="17" font-weight="700" fill="#fef08a">มาตรการความปลอดภัยและตรวจเช็คอุปกรณ์ก่อนเริ่มงาน</text>
    <text x="50" y="165" font-family="Noto Sans Thai, sans-serif" font-size="13.5" fill="#fef2f2">1. สวมใส่อุปกรณ์ PPE ครบชุด  2. ขับขี่ไม่เกิน 10 กม./ชม.</text>
    <rect x="50" y="250" width="210" height="40" rx="20" fill="#ffffff"/>
    <text x="155" y="275" font-family="Noto Sans Thai, sans-serif" font-size="13.5" font-weight="800" fill="#b91c1c" text-anchor="middle">🛡️ จป. ปฏิบัติการ DC</text>
    <text x="740" y="200" font-family="Noto Sans Thai, sans-serif" font-size="55" text-anchor="end">🦺⛑️⚠️</text>
  </svg>`);

  const BANNER_HR = encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 320" width="800" height="320">
    <defs>
      <linearGradient id="gHR" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#006837"/>
        <stop offset="50%" stop-color="#0284c7"/>
        <stop offset="100%" stop-color="#0ea5e9"/>
      </linearGradient>
    </defs>
    <rect width="800" height="320" fill="url(#gHR)" rx="16"/>
    <text x="50" y="75" font-family="Noto Sans Thai, sans-serif" font-size="24" font-weight="800" fill="#ffffff">PTG HEALTH &amp; WELLNESS 2569</text>
    <text x="50" y="125" font-family="Noto Sans Thai, sans-serif" font-size="20" font-weight="700" fill="#fef08a">ตรวจสุขภาพประจำปี พนักงาน DC วังน้อย</text>
    <rect x="50" y="235" width="230" height="42" rx="21" fill="#ffffff"/>
    <text x="165" y="262" font-family="Noto Sans Thai, sans-serif" font-size="13.5" font-weight="800" fill="#006837" text-anchor="middle">🩺 ฝ่ายทรัพยากรบุคคล (HR)</text>
    <text x="740" y="265" font-family="Noto Sans Thai, sans-serif" font-size="60" text-anchor="end">🏥🩺💚</text>
  </svg>`);

  const BANNER_OPS = encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 320" width="800" height="320">
    <defs>
      <linearGradient id="gOps" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#064e3b"/>
        <stop offset="50%" stop-color="#059669"/>
        <stop offset="100%" stop-color="#10b981"/>
      </linearGradient>
    </defs>
    <rect width="800" height="320" fill="url(#gOps)" rx="16"/>
    <text x="50" y="75" font-family="Noto Sans Thai, sans-serif" font-size="24" font-weight="800" fill="#ffffff">📊 DC OPERATIONS PERFORMANCE</text>
    <text x="50" y="125" font-family="Noto Sans Thai, sans-serif" font-size="19" font-weight="700" fill="#fde047">สรุปยอดจ่ายสินค้า Wave Max Mart &amp; พันธุ์ไทย สัปดาห์ที่ 2</text>
    <rect x="50" y="235" width="230" height="42" rx="21" fill="#ffffff"/>
    <text x="165" y="262" font-family="Noto Sans Thai, sans-serif" font-size="13.5" font-weight="800" fill="#064e3b" text-anchor="middle">⚡ ฝ่ายปฏิบัติการ DC วังน้อย</text>
    <text x="740" y="265" font-family="Noto Sans Thai, sans-serif" font-size="60" text-anchor="end">📦🚛🏆</text>
  </svg>`);

  // Authentic Seed Announcements for August 2026 (matching user Gmail from PT Happyworkplace)
  const DEFAULT_EMAIL_ANNOUNCEMENTS = [
    {
      id: "ann-happy-ep41",
      title: "💚 มุม \"รัก\" สุขภาพ EP.41 : 🫁 ยิ่งสูบ ยิ่งพัง 10 อันตรายจากนิโคติน ในบุหรี่-บุหรี่ไฟฟ้า กับ 5 สารพิษ อันตรายในบุหรี่ไฟฟ้า",
      content: "เพราะ สุขภาพ ของพนักงานเป็นสิ่งสำคัญ\n\n📌 10 อันตรายจากนิโคตินในบุหรี่/บุหรี่ไฟฟ้า:\n1. ทำลายปอด 2. หัวใจเต้นเร็วผิดปกติ 3. เกิดภาวะหลอดเลือดแข็งตัว 4. เสี่ยงโรคหลอดเลือดสมอง 5. ทำลายระบบประสาท 6. ลดระดับออกซิเจนในเลือด 7. กระตุ้นโรคเบาหวาน 8. ระบบภูมิคุ้มกันบกพร่อง 9. เพิ่มความเสี่ยงมะเร็ง 10. มีสารเสพติดรุนแรง เลิกยาก\n\n☠️ 5 สารพิษในบุหรี่ไฟฟ้า: นิโคติน, ฟอร์มาลดีไฮด์, โพรไพลีนไกลคอล, โลหะหนัก (ตะกั่ว), สารหนู\n\n📞 สายด่วนเลิกบุหรี่ 1600 \"อย่าปล่อยให้ควันจาง ทำลายชีวิตคุณให้หายไป\"\n📲 แนะนำ! ดาวน์โหลด Persona Health ตัวช่วยประเมินสุขภาพพนักงาน",
      author: "PT Happyworkplace (happyworkplace@pt.co.th)",
      type: "urgent",
      pinned: true,
      image: BANNER_EP41_SMOKING,
      createdAt: new Date("2026-08-14T15:51:00").getTime()
    },
    {
      id: "ann-happy-pledge",
      title: "💛 \"เข้าพรรษา 16 วันแล้ว เป็นยังไงกันบ้าง? \" ชวนตั้งปณิธาน \"ชนะแล้ว ชนะใจ เลิกเหล้า หยุดบุหรี่\" ปี 4",
      content: "ขอเชิญเพื่อนๆ ชาว PTG ทุกท่าน มาร่วมตั้งปณิธาน ในกิจกรรม ชนะแล้ว ชนะใจ \"เลิกเหล้า หยุดบุหรี่\" เข้าพรรษานี้คุณทำได้ ปี 4\n\nร่วมส่งต่อพลังบวก ดูแลสุขภาพกาย-ใจตนเองและครอบครัว พร้อมรับของที่ระลึกพิเศษจากโครงการ PT Happyworkplace",
      author: "PT Happyworkplace (happyworkplace@pt.co.th)",
      type: "event",
      pinned: true,
      image: BANNER_PLEDGE_LENT,
      createdAt: new Date("2026-08-14T15:47:00").getTime()
    },
    {
      id: "ann-happy-ep40",
      title: "💚 มุม \"รัก\" สุขภาพ EP.40 : การดูแลกาย - ใจตนเอง ❤️ สำหรับบุคคลทั่วไปที่รับรู้เหตุการณ์รุนแรง",
      content: "(เพราะสุขภาพ กาย - ใจ ของพนักงานเป็นสิ่งสำคัญ)\nการรับฟังและเสพข่าวสารอย่างมีสติ เทคนิคการผ่อนคลายกล้ามเนื้อ หายใจเข้า-ออกลึกๆ และการสร้างภูมิคุ้มกันทางอารมณ์ในการทำงานร่วมกันในองค์กร",
      author: "PT Happyworkplace (happyworkplace@pt.co.th)",
      type: "general",
      pinned: false,
      image: BANNER_EP40_MENTAL,
      createdAt: new Date("2026-08-13T10:30:00").getTime()
    },
    {
      id: "ann-happy-motherday",
      title: "💙 PT Mother Day 2026 💙 กิจกรรมแบ่งปันช่วงเวลาดีๆ เพราะทุกช่วงเวลากับคุณแม่ คือความทรงจำที่มีคุณค่า",
      content: "📸 กิจกรรมต้อนรับวันแม่แห่งชาติ 2569\nขอเชิญชวนพนักงาน PTG ทุกท่าน ร่วมแบ่งปันภาพถ่ายช่วงเวลาสุดประทับใจคู่กับคุณแม่ พร้อมเขียนคำบรรยายความรู้สึกสั้นๆ เพื่อลุ้นรับบัตรของขวัญและของรางวัลสุดพิเศษ",
      author: "PT Happyworkplace (happyworkplace@pt.co.th)",
      type: "event",
      pinned: false,
      image: BANNER_MOTHER_DAY_2026,
      createdAt: new Date("2026-08-11T14:20:00").getTime()
    },
    {
      id: "ann-happy-workshop",
      title: "[เริ่มแล้ว Workshop สุขหมดสี่อก] 🥰💖 PT Health me ชวนร่วมงาน \"มาลานารี ชีวิตครอบครัวยุคใหม่ พร้อมใส่ใจสุขภาพคุณแม่\"",
      content: "ลงทะเบียนเข้าร่วมกิจกรรม Workshop สุขภาพสตรีและการดูแลสุขภาพคนในครอบครัว ได้ทั้งรูปแบบ Onsite ณ ศูนย์ปฏิบัติการ และ Online ผ่าน MS Teams",
      author: "PT Health me (healthme@pt.co.th)",
      type: "event",
      pinned: false,
      image: BANNER_WORKSHOP_HEALTHME,
      createdAt: new Date("2026-08-11T09:15:00").getTime()
    },
    {
      id: "ann-happy-ep38",
      title: "💚 มุม \"รัก\" สุขภาพ EP.38 : 🍺 หายนะที่ควรระวัง โรคยอดฮิตจากฤทธิ์แอลกอฮอล์",
      content: "เจาะลึก 5 ภัยเงียบจากเครื่องดื่มแอลกอฮอล์ที่ทำร้ายตับ สมอง และระบบหัวใจและหลอดเลือด พร้อมแนวทางฟื้นฟูร่างกายอย่างถูกวิธี",
      author: "PT Happyworkplace (happyworkplace@pt.co.th)",
      type: "urgent",
      pinned: false,
      image: BANNER_ALCOHOL,
      createdAt: new Date("2026-08-10T11:00:00").getTime()
    },
    {
      id: "ann-email-past-1",
      title: "[HR Notice] สรุปผลการฝึกอบรมการใช้งานระบบ Handheld สแกนเนอร์ ประจำเดือนกรกฎาคม 2569",
      content: "ฝ่ายทรัพยากรบุคคลและฝ่ายพัฒนาบุคลากร ขอสรุปผลการอบรมการใช้งานเครื่องยิงสแกนเนอร์ Handheld รุ่นใหม่ให้แก่ทีมคลังสินค้าครบถ้วน 100% เรียบร้อยแล้ว",
      author: "HR Training (hr.dc@pt.co.th)",
      type: "general",
      pinned: false,
      image: "",
      createdAt: new Date("2026-07-28T11:00:00").getTime()
    }
  ];

  let currentMonthFilter = "current"; // "current" | "prev" | "all"
  function getAnnouncements() {
    try {
      // Clear legacy storage keys
      localStorage.removeItem("ptg_dc_announcements");
      localStorage.removeItem("ptg_dc_announcements_v2");
      localStorage.removeItem("ptg_dc_announcements_v3");
      localStorage.removeItem("ptg_dc_announcements_v4");
      localStorage.removeItem("ptg_dc_announcements_v5");

      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        return [];
      }
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        return [];
      }
      return parsed;
    } catch(e) {
      return [];
    }
  }

  function saveAnnouncements(arr) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }
    catch(e) {}
  }

  function formatDateTime(ts) {
    const d = new Date(ts);
    const h = String(d.getHours()).padStart(2,"0");
    const m = String(d.getMinutes()).padStart(2,"0");
    return `${d.getDate()} ${TH_MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()+543}, ${h}:${m} น.`;
  }

  function formatDateInput(ts) {
    const d = new Date(ts || Date.now());
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function openLightbox(src, caption = "") {
    const overlay = document.getElementById("imageLightboxOverlay");
    const img = document.getElementById("lightboxImg");
    const cap = document.getElementById("lightboxCaption");
    if (img) img.src = src;
    if (cap) cap.textContent = caption;
    overlay?.classList.add("show");
  }

  function closeLightbox() {
    const overlay = document.getElementById("imageLightboxOverlay");
    overlay?.classList.remove("show");
  }

  function updateMonthFilterButtons() {
    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth();
    const curThMonth = TH_MONTHS_SHORT[curMonth];
    const curThYear = (curYear + 543) % 100;

    let prevMonth = curMonth - 1;
    let prevYear = curYear;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }
    const prevThMonth = TH_MONTHS_SHORT[prevMonth];
    const prevThYear = (prevYear + 543) % 100;

    const curLabel = document.getElementById("currentMonthFilterLabel");
    const prevLabel = document.getElementById("prevMonthFilterLabel");
    if (curLabel) curLabel.textContent = `📅 เดือนปัจจุบัน (${curThMonth} ${curThYear})`;
    if (prevLabel) prevLabel.textContent = `📁 ${prevThMonth} ${prevThYear}`;

    const allList = getAnnouncements();
    const curCount = allList.filter(x => {
      const d = new Date(x.createdAt);
      return d.getFullYear() === curYear && d.getMonth() === curMonth;
    }).length;

    const prevCount = allList.filter(x => {
      const d = new Date(x.createdAt);
      return d.getFullYear() === prevYear && d.getMonth() === prevMonth;
    }).length;

    const curBadge = document.getElementById("currentMonthCount");
    const prevBadge = document.getElementById("prevMonthCount");
    const allBadge = document.getElementById("allMonthsCount");
    if (curBadge) curBadge.textContent = curCount;
    if (prevBadge) prevBadge.textContent = prevCount;
    if (allBadge) allBadge.textContent = allList.length;

    // Update active button state
    document.querySelectorAll("[data-month-filter]").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-month-filter") === currentMonthFilter);
    });
  }

  function renderAnnouncements() {
    const feed = document.getElementById("announceFeed");
    const empty = document.getElementById("announceEmpty");
    const emptyText = document.getElementById("announceEmptyText");
    if (!feed) return;

    updateMonthFilterButtons();

    const now = new Date();
    const curYear = now.getFullYear();
    const curMonth = now.getMonth();
    let prevMonth = curMonth - 1;
    let prevYear = curYear;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }

    let allList = getAnnouncements();

    // Filter by selected month to keep DOM lightweight and super fast
    let list = allList;
    if (currentMonthFilter === "current") {
      list = allList.filter(x => {
        const d = new Date(x.createdAt);
        return d.getFullYear() === curYear && d.getMonth() === curMonth;
      });
      if (emptyText) emptyText.textContent = `ไม่มีประกาศในเดือนปัจจุบัน (${TH_MONTHS_SHORT[curMonth]} ${curYear+543})`;
    } else if (currentMonthFilter === "prev") {
      list = allList.filter(x => {
        const d = new Date(x.createdAt);
        return d.getFullYear() === prevYear && d.getMonth() === prevMonth;
      });
      if (emptyText) emptyText.textContent = `ไม่มีประกาศในเดือน ${TH_MONTHS_SHORT[prevMonth]} ${prevYear+543}`;
    } else {
      if (emptyText) emptyText.textContent = "ยังไม่มีประกาศในขณะนี้";
    }

    // Sort: Pinned first, then newest date desc
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
            ${item.image ? `
              <div class="announce-card-img-wrap" title="คลิกเพื่อดูรูปภาพขนาดเต็ม">
                <img src="${item.image}" alt="รูปภาพประกาศ" class="announce-card-img" data-lightbox-src="${escHtml(item.image)}" data-lightbox-cap="${escHtml(item.title)}">
              </div>
            ` : ""}
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

    // Lightbox image clicks
    feed.querySelectorAll("[data-lightbox-src]").forEach(img => {
      img.addEventListener("click", () => {
        openLightbox(img.getAttribute("data-lightbox-src"), img.getAttribute("data-lightbox-cap"));
      });
    });
  }

  function escHtml(str) {
    return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  }

  function compressImage(file, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement("canvas");
        const maxDim = 900;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        callback(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function setPreviewImage(dataUrl) {
    const imageData = document.getElementById("announceImageData");
    const previewBox = document.getElementById("announceImagePreviewBox");
    const previewImg = document.getElementById("announcePreviewImg");
    const uploadBox = document.getElementById("announceUploadBox");
    if (imageData) imageData.value = dataUrl;
    if (previewImg) previewImg.src = dataUrl;
    if (previewBox) previewBox.style.display = "block";
    if (uploadBox) uploadBox.style.display = "none";
  }

  function clearPreviewImage() {
    const imageInput = document.getElementById("announceImageInput");
    const imageData = document.getElementById("announceImageData");
    const previewBox = document.getElementById("announceImagePreviewBox");
    const previewImg = document.getElementById("announcePreviewImg");
    const uploadBox = document.getElementById("announceUploadBox");
    if (imageInput) imageInput.value = "";
    if (imageData) imageData.value = "";
    if (previewImg) previewImg.src = "";
    if (previewBox) previewBox.style.display = "none";
    if (uploadBox) uploadBox.style.display = "block";
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
    const typeSelect = document.getElementById("announceType");
    const dateInput = document.getElementById("announceDate");
    const emailHelperBox = document.getElementById("emailPasteBox");
    const rawEmailInput = document.getElementById("rawEmailPasteInput");

    if (emailHelperBox) emailHelperBox.style.display = "none";
    if (rawEmailInput) rawEmailInput.value = "";

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
      if (typeSelect) typeSelect.value = item.type || "general";
      if (dateInput) dateInput.value = formatDateInput(item.createdAt);
      
      if (item.image) {
        setPreviewImage(item.image);
      } else {
        clearPreviewImage();
      }
      updateCharCount();
    } else {
      titleEl.textContent = "โพสต์ประกาศใหม่ (หรือวางจาก Email)";
      submitLabel.textContent = "โพสต์ประกาศ";
      editIdEl.value = "";
      document.getElementById("announceForm")?.reset();
      if (typeSelect) typeSelect.value = "general";
      if (dateInput) dateInput.value = formatDateInput(Date.now());
      clearPreviewImage();
      updateCharCount();
    }
    overlay?.classList.add("show");
    setTimeout(() => titleInput?.focus(), 150);
  }

  function closeModal() {
    const overlay = document.getElementById("announceModalOverlay");
    overlay?.classList.remove("show");
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
    if (content && hint) hint.textContent = `${content.value.length} / 600 ตัวอักษร`;
  }

  // Parse Raw Email Text & Auto Populate Form
  function parseEmailText(raw) {
    if (!raw || !raw.trim()) return;

    let subject = "";
    let from = "";
    let body = [];
    const lines = raw.split(/\r?\n/);

    let isHeader = true;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line && isHeader) {
        // First empty line separates header from body
        isHeader = false;
        continue;
      }

      if (isHeader) {
        if (/^(Subject|หัวข้อ|เรื่อง):\s*(.+)$/i.test(line)) {
          subject = line.replace(/^(Subject|หัวข้อ|เรื่อง):\s*/i, "").trim();
        } else if (/^(From|ผู้ส่ง|จาก):\s*(.+)$/i.test(line)) {
          from = line.replace(/^(From|ผู้ส่ง|จาก):\s*/i, "").trim();
        } else {
          // If not standard header, add to body
          body.push(lines[i]);
          isHeader = false;
        }
      } else {
        body.push(lines[i]);
      }
    }

    const content = body.join("\n").trim() || raw.trim();

    const titleInput = document.getElementById("announceTitle");
    const authorInput = document.getElementById("announceAuthor");
    const contentInput = document.getElementById("announceContent");
    const typeSelect = document.getElementById("announceType");

    if (subject && titleInput) titleInput.value = subject;
    else if (!titleInput.value && content) {
      // First line of content as title
      const firstLine = lines.find(l => l.trim().length > 0) || "";
      if (firstLine.length < 80) titleInput.value = firstLine;
    }

    if (from && authorInput) authorInput.value = from;
    if (content && contentInput) contentInput.value = content;

    // Smart category detect
    const fullText = (subject + " " + content).toLowerCase();
    if (typeSelect) {
      if (/ซ่อม|ปรับปรุง|ดับไฟ|wms|wifi|network|server|บำรุง/i.test(fullText)) {
        typeSelect.value = "maintenance";
      } else if (/ด่วน|ฉุกเฉิน|เตือน|safety|จป|อุบัติเหตุ|ppe|ความปลอดภัย/i.test(fullText)) {
        typeSelect.value = "urgent";
      } else if (/กิจกรรม|ตรวจสุขภาพ|สวัสดิการ|อบรม|รางวัล|party|สัมมนา/i.test(fullText)) {
        typeSelect.value = "event";
      } else if (/วันหยุด|สงกรานต์|ปีใหม่|พักผ่อน|ลา/i.test(fullText)) {
        typeSelect.value = "holiday";
      } else {
        typeSelect.value = "general";
      }
    }

    updateCharCount();

    // Show toast
    if (typeof showToast === "function") {
      showToast("✨ ดึงข้อมูลจากอีเมลลงฟอร์มเรียบร้อยแล้ว");
    }
  }

  const GAS_EMAIL_URL = "https://script.google.com/macros/s/AKfycbwIsLyPnb4J9uEmf7H-ZwfLtmrBTbvfSUxRT5QJK3tR6qi9QOSaifqtDPZV5P_z9KVIJA/exec";

  function getCurrentEmailFeedUrl() {
    const now = new Date();
    const url = new URL(GAS_EMAIL_URL);
    // The Apps Script is the source-of-truth filter. Sending the Bangkok month
    // here also makes the requested scope explicit in each API call.
    const bangkokParts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Bangkok", year: "numeric", month: "2-digit"
    }).formatToParts(now);
    const part = type => bangkokParts.find(x => x.type === type)?.value;
    url.searchParams.set("year", part("year"));
    url.searchParams.set("month", part("month"));
    return url.toString();
  }

  function normalizeEmailItem(raw) {
    if (!raw) return null;
    const id = raw.id || raw.messageId || "email-" + (raw.timestamp || Date.now()) + "-" + Math.random().toString(36).substr(2, 5);
    const title = raw.subject || raw.title || raw.header || "ข่าวสารประชาสัมพันธ์ DC";
    const content = raw.body || raw.content || raw.snippet || raw.plainBody || raw.message || "";
    const author = raw.from || raw.sender || raw.author || "PT Happyworkplace";

    let createdAt = Date.now();
    if (raw.date || raw.timestamp || raw.createdAt || raw.time) {
      const d = new Date(raw.date || raw.timestamp || raw.createdAt || raw.time);
      if (!isNaN(d.getTime())) createdAt = d.getTime();
    }

    let type = raw.type || raw.category;
    if (!TYPE_CONFIG[type]) {
      const txt = (title + " " + content).toLowerCase();
      if (/อันตราย|นิโคติน|สารพิษ|บุหรี่|แอลกอฮอล์|ด่วน|safety|เตือน|อุบัติเหตุ|ฉุกเฉิน/i.test(txt)) type = "urgent";
      else if (/กิจกรรม|workshop|วันแม่|เข้าพรรษา|ปณิธาน|สุขภาพ|ตรวจสุขภาพ|รางวัล/i.test(txt)) type = "event";
      else if (/ซ่อม|ปรับปรุง|wms|wifi|network|server|บำรุง/i.test(txt)) type = "maintenance";
      else if (/วันหยุด|สวัสดิการ|ลา/i.test(txt)) type = "holiday";
      else type = "general";
    }

    // Extract image attachment from GAS response (Base64, URL, or Array)
    let image = "";
    if (raw.image && typeof raw.image === "string") image = raw.image;
    else if (raw.imageUrl && typeof raw.imageUrl === "string") image = raw.imageUrl;
    else if (raw.imageBase64 && typeof raw.imageBase64 === "string") image = raw.imageBase64;
    else if (Array.isArray(raw.images) && raw.images.length > 0) image = raw.images[0];
    else if (Array.isArray(raw.attachments) && raw.attachments.length > 0) {
      const att = raw.attachments[0];
      if (typeof att === "string") image = att;
      else if (att && (att.data || att.base64 || att.url || att.src)) image = att.data || att.base64 || att.url || att.src;
    } else if (raw.attachment) {
      if (typeof raw.attachment === "string") image = raw.attachment;
      else if (raw.attachment.data || raw.attachment.base64) image = raw.attachment.data || raw.attachment.base64;
    } else if (raw.htmlBody) {
      const m = raw.htmlBody.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (m && m[1] && !m[1].startsWith("cid:")) image = m[1];
    }

    // Match banner fallback if no image attached
    if (!image) {
      const txt = (title + " " + content).toLowerCase();
      if (/ep\.41|นิโคติน|บุหรี่/i.test(txt)) image = BANNER_EP41_SMOKING;
      else if (/เข้าพรรษา|เลิกเหล้า/i.test(txt)) image = BANNER_PLEDGE_LENT;
      else if (/mother day|วันแม่/i.test(txt)) image = BANNER_MOTHER_DAY_2026;
      else if (/workshop|มาลานารี/i.test(txt)) image = BANNER_WORKSHOP_HEALTHME;
      else if (/ep\.38|แอลกอฮอล์/i.test(txt)) image = BANNER_ALCOHOL;
      else if (/ep\.40|ดูแลกาย/i.test(txt)) image = BANNER_EP40_MENTAL;
      else if (type === "maintenance") image = BANNER_IT;
      else if (type === "urgent") image = BANNER_SAFETY;
      else if (type === "event") image = BANNER_HR;
      else if (/ยอดจ่าย|uph|delivery|wave/i.test(txt)) image = BANNER_OPS;
    }

    const pinned = Boolean(raw.pinned || raw.isPinned || raw.isStar || raw.starred || /ep\.41|วันแม่|เข้าพรรษา/i.test(title));

    return { id, title, content, author, type, image, pinned, createdAt, isEmail: true };
  }

  async function syncAnnouncementsFromEmail(isManual = false) {
    const syncBtn = document.getElementById("syncEmailBtn");
    const syncStatus = document.getElementById("emailSyncStatus");

    if (syncBtn) {
      syncBtn.classList.add("loading");
      syncBtn.disabled = true;
    }
    if (syncStatus) {
      syncStatus.innerHTML = `<span class="sync-dot-live" style="background:#0284c7;"></span><span>กำลังซิงค์ข่าวจาก Email...</span>`;
      syncStatus.className = "announce-board-sub is-syncing";
    }

    try {
      const controller = new AbortController();
      // Gmail messages with real inline campaign artwork can take longer than
      // a lightweight JSON feed. Give the Apps Script enough time to return
      // the current month's original attachments instead of falling back to
      // an empty/cached board.
      const timeoutId = setTimeout(() => controller.abort(), 120000);

      const res = await fetch(getCurrentEmailFeedUrl(), {
        method: "GET",
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error("HTTP error " + res.status);
      const data = await res.json();

      let rawItems = [];
      if (Array.isArray(data)) rawItems = data;
      else if (data && Array.isArray(data.data)) rawItems = data.data;
      else if (data && Array.isArray(data.emails)) rawItems = data.emails;
      else if (data && Array.isArray(data.items)) rawItems = data.items;
      else if (data && Array.isArray(data.announcements)) rawItems = data.announcements;
      else if (data && typeof data === "object") {
        // Find first array property
        for (const k in data) {
          if (Array.isArray(data[k])) {
            rawItems = data[k];
            break;
          }
        }
      }

      if (rawItems.length > 0) {
        const normalizedItems = rawItems.map(normalizeEmailItem).filter(Boolean);
        const existing = getAnnouncements();
        const manualPosts = existing.filter(x => !x.isEmail);

        const mergedMap = new Map();
        manualPosts.forEach(item => mergedMap.set(item.id, item));
        normalizedItems.forEach(item => mergedMap.set(item.id, item));

        const mergedList = Array.from(mergedMap.values());
        saveAnnouncements(mergedList);
        renderAnnouncements();

        const timeStr = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
        if (syncStatus) {
          syncStatus.innerHTML = `<span class="sync-dot-live"></span><span>ซิงค์ Email สำเร็จ (${timeStr} น. · ${normalizedItems.length} ข่าว)</span>`;
          syncStatus.className = "announce-board-sub is-synced";
        }
        if (isManual && typeof showToast === "function") {
          showToast(`✨ ซิงค์ข่าวจาก Email สำเร็จ (${normalizedItems.length} ข่าว)`);
        }
      } else {
        if (syncStatus) {
          syncStatus.innerHTML = `<span class="sync-dot-live"></span><span>เชื่อมต่อ Email แล้ว (ไม่มีอีเมลใหม่)</span>`;
          syncStatus.className = "announce-board-sub is-synced";
        }
      }
    } catch(err) {
      console.warn("GAS Email Sync Note:", err);
      if (syncStatus) {
        syncStatus.innerHTML = `<span class="sync-dot-live" style="background:#9ca3af;"></span><span>ข้อมูล Email (แคชในระบบ)</span>`;
        syncStatus.className = "announce-board-sub is-offline";
      }
      if (isManual && typeof showToast === "function") {
        showToast("ℹ️ แสดงข้อมูลล่าสุดจากแคช");
      }
    } finally {
      if (syncBtn) {
        syncBtn.classList.remove("loading");
        syncBtn.disabled = false;
      }
    }
  }

  function initAnnounceBoard() {
    renderAnnouncements();

    // Month filter pills
    document.querySelectorAll("[data-month-filter]").forEach(btn => {
      btn.addEventListener("click", () => {
        currentMonthFilter = btn.getAttribute("data-month-filter");
        renderAnnouncements();
      });
    });

    // Open modal
    document.getElementById("openAnnounceModalBtn")?.addEventListener("click", () => openModal(null));
    document.getElementById("closeAnnounceModalBtn")?.addEventListener("click", closeModal);
    document.getElementById("cancelAnnounceBtn")?.addEventListener("click", closeModal);

    // Close on overlay click
    document.getElementById("announceModalOverlay")?.addEventListener("click", e => {
      if (e.target.id === "announceModalOverlay") closeModal();
    });

    // Close lightbox
    document.getElementById("closeLightboxBtn")?.addEventListener("click", closeLightbox);
    document.getElementById("imageLightboxOverlay")?.addEventListener("click", e => {
      if (e.target.id === "imageLightboxOverlay") closeLightbox();
    });

    // Email Helper Toggle
    const toggleEmailBtn = document.getElementById("toggleEmailHelperBtn");
    const emailPasteBox = document.getElementById("emailPasteBox");
    const emailHelperWrap = document.querySelector(".announce-email-helper-wrap");
    toggleEmailBtn?.addEventListener("click", () => {
      if (!emailPasteBox) return;
      const isOpen = emailPasteBox.style.display !== "none";
      emailPasteBox.style.display = isOpen ? "none" : "block";
      emailHelperWrap?.classList.toggle("open", !isOpen);
      if (!isOpen) {
        document.getElementById("rawEmailPasteInput")?.focus();
      }
    });

    document.getElementById("applyEmailHelperBtn")?.addEventListener("click", () => {
      const raw = document.getElementById("rawEmailPasteInput")?.value;
      parseEmailText(raw);
    });

    document.getElementById("clearEmailHelperBtn")?.addEventListener("click", () => {
      const input = document.getElementById("rawEmailPasteInput");
      if (input) input.value = "";
    });

    // Image Upload triggers
    const uploadTrigger = document.getElementById("announceUploadTrigger");
    const imageInput = document.getElementById("announceImageInput");
    const removeImgBtn = document.getElementById("announceRemoveImgBtn");

    uploadTrigger?.addEventListener("click", () => {
      imageInput?.click();
    });

    imageInput?.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      compressImage(file, setPreviewImage);
    });

    // Drag and Drop on upload area
    uploadTrigger?.addEventListener("dragover", (e) => {
      e.preventDefault();
      uploadTrigger.style.borderColor = "var(--pt-green)";
      uploadTrigger.style.background = "#f0fdf4";
    });
    uploadTrigger?.addEventListener("dragleave", () => {
      uploadTrigger.style.borderColor = "var(--line)";
      uploadTrigger.style.background = "#fbfdfc";
    });
    uploadTrigger?.addEventListener("drop", (e) => {
      e.preventDefault();
      uploadTrigger.style.borderColor = "var(--line)";
      uploadTrigger.style.background = "#fbfdfc";
      const file = e.dataTransfer?.files?.[0];
      if (file && file.type.startsWith("image/")) {
        compressImage(file, setPreviewImage);
      }
    });

    // Paste image from Clipboard (Ctrl+V) anywhere in modal form
    const modalForm = document.getElementById("announceForm");
    modalForm?.addEventListener("paste", (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            compressImage(blob, setPreviewImage);
            break;
          }
        }
      }
    });

    removeImgBtn?.addEventListener("click", clearPreviewImage);

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
      const dateVal = document.getElementById("announceDate")?.value;
      const image = document.getElementById("announceImageData")?.value || "";
      const editId = document.getElementById("announceEditId")?.value;

      if (!title || !content) return;

      let postDate = Date.now();
      if (dateVal) {
        const parsedD = new Date(dateVal + "T" + new Date().toTimeString().slice(0,8));
        if (!isNaN(parsedD.getTime())) postDate = parsedD.getTime();
      }

      let list = getAnnouncements();
      if (editId) {
        list = list.map(x => x.id === editId ? { ...x, title, content, author, pinned, type, image, createdAt: postDate, updatedAt: Date.now() } : x);
      } else {
        list.unshift({ id: "ann-" + Date.now(), title, content, author, pinned, type, image, createdAt: postDate });
      }
      saveAnnouncements(list);
      renderAnnouncements();
      closeModal();
      if (typeof showToast === "function") {
        showToast(editId ? "บันทึกการแก้ไขเรียบร้อยแล้ว" : "โพสต์ประกาศเรียบร้อยแล้ว");
      }
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

