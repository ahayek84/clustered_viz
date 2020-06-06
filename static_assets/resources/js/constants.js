export default class Constants {

    constructor() {
        this.file = '';
    }

    //////

    get_list_geojson() {
        var ret = {
            arab_countries: 'Arab_Countries.json',
            border_line: 'Border_Line.json',
            governorates_points_edited: 'governorate_points_edited.json',
            governorates_en: 'Governorates.json',
            governorates_ar: 'Governorates_ar.json',
            locality2017: 'Locality2017.json',
            palestine_border: 'Palestine_Border.json',
            river: 'River.json',
            sea: 'Sea.json',
            us_states: 'us-states.json',
            bethlehem_localities: 'Bethlehem_Localities.json',
            bethlehem_localities_ar: 'Bethlehem_Localities_ar.json'
        }

        return ret
    }

    ///

    get_geoname_lookup(type) {
        var geo_codes_en = {
            1:'Palestine',
            1235: "Jericho & Al Aghwar",
            2475: "Rafah",
            2455: "North Gaza",
            1110: "Tulkarm",
            1240: "Jerusalem",
            2460: "Gaza",
            2470: "Khan Yunis",
            1120: "Qalqiliya",
            1101: "Jenin",
            2465: "Deir Al Balah",
            1125: "Salfit",
            1350: "Hebron",
            1230: "Ramallah & Al Bireh",
            1105: "Tubas",
            1115: "Nablus",
            1345: "Bethlehem"
        };

        var geo_codes_ar = {
            1:'فلسطين',
            1235: "أريحا والأغوار",
            2475: "رفح",
            2455: "شمال غزة",
            1110: "طولكرم",
            1240: "القدس",
            2460: "غزة",
            2470: "خانيونس",
            1120: "قلقيلية",
            1101: "جنين",
            2465: "دير البلح",
            1125: "سلفيت",
            1350: "الخليل",
            1230: "رام الله والبيرة",
            1105: "طوباس",
            1115: "نابلس",
            1345: "بيت لحم"
        };

        var dic = geo_codes_en
        if (type == 'ar') {
            dic = geo_codes_ar
        }

        return dic

    }


    get_localname_lookup(type) {
        var geo_codes_en = {
            13452170: "Al Walaja",
            13452175: "Battir",
            13452180: "Al 'Ubeidiya",
            13452185: "Ayda Camp",
            13452190: "Khallet an Nu'man",
            13452195: "Al 'Aza Camp",
            13452200: "Al Khas",
            13452205: "Al Haddadiya",
            13452208: "Khallet Hamameh",
            13452209: "Bir Onah",
            13452210: "Beit Jala",
            13452225: "Dar  Salah",
            13452230: "Husan",
            13452235: "Wadi Fukin",
            13452240: "Bethlehem (Beit Lahm)",
            13452255: "Beit Sahur",
            13452265: "Ad Doha",
            13452270: "Al Khadr",
            13452275: "Ad Duheisha Camp",
            13452280: "Hindaza and Bureid'a",
            13452285: "Ash Shawawra",
            13452300: "Artas",
            13452325: "Nahhalin",
            13452335: "Beit Ta'mir",
            13452345: "Khallet al Louza",
            13452355: "Al Jab'a",
            13452360: "Za'tara",
            13452375: "Al Fureidis",
            13452385: "Jannatah (Badd Falouh)",
            13452390: "Khallet al Balluta",
            13452400: "Wadi Rahhal",
            13452405: "Jub adh Dhib",
            13452415: "Khallet Sakariya",
            13452430: "Khallet al Haddad",
            13452440: "Al Ma'sara",
            13452445: "Wadi an Nis",
            13452455: "Khirbet ad Deir",
            13452460: "Jurat ash Sham'a",
            13452465: "Khallet 'Afana",
            13452470: "Marah Ma'alla",
            13452475: "Al Halqum",
            13452480: "Umm Salamuna",
            13452490: "Al Manshiya",
            13452495: "Tuqu",
            13452500: "Marah Rabah",
            13452510: "Wadi  Immhamid",
            13452520: "Khirbet Tuqu",
            13452525: "Beit Fajjar",
            13452535: "Al Maniya",
            13452565: "Kisan",
            13452660: "Arab ar Rashayida"
        };

        var geo_codes_ar = {
            13452170: "الولجة",
            13452175: "بتير",
            13452180: "العبيدية",
            13452185: "مخيم عايدة",
            13452190: "خلة النعمان",
            13452195: "مخيم العزة",
            13452200: "الخاص",
            13452205: "الحدادية",
            13452208: "خلة حمامة",
            13452209: "بئر عونة",
            13452210: "بيت جالا",
            13452225: "دار صلاح",
            13452230: "حوسان",
            13452235: "وادي فوكين",
            13452240: "بيت لحم",
            13452255: "بيت ساحور",
            13452265: "الدوحة",
            13452270: "الخضر",
            13452275: "مخيم الدهيشة",
            13452280: "هندازة وبريضعة",
            13452285: "الشواورة",
            13452300: "إرطاس",
            13452325: "نحالين",
            13452335: "بيت تعمر",
            13452345: "خلة اللوزة",
            13452355: "الجبعة",
            13452360: "زعترة",
            13452375: "الفريديس",
            13452385: "جناتا (بد فلوح)",
            13452390: "خلة البلوطه",
            13452400: "وادي رحال",
            13452405: "جب الذيب",
            13452415: "خلة سكاريا",
            13452430: "خلة الحداد",
            13452440: "المعصرة",
            13452445: "وادي النيص",
            13452455: "خربة الدير",
            13452460: "جورة الشمعة",
            13452465: "خلة عفانة",
            13452470: "مراح معلا",
            13452475: "الحلقوم",
            13452480: "أم سلمونة",
            13452490: "المنشية",
            13452495: "تقوع",
            13452500: "مراح رباح",
            13452510: "وادي امحيميد",
            13452520: "خربة تقوع",
            13452525: "بيت فجار",
            13452535: "المنيا",
            13452565: "كيسان",
            13452660: "عرب الرشايدة"
        };

        var dic = geo_codes_en
        if (type == 'ar') {
            dic = geo_codes_ar
        }

        return dic

    }

}


