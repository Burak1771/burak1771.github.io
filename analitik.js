(function () {
    const olcumKimligi = "G-YMS32EVTTH";
    const izinAnahtari = "elay_analitik_izni";

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
        window.dataLayer.push(arguments);
    };

    window.gtag("consent", "default", {
        ad_storage: "denied",
        analytics_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied"
    });

    function analitigiBaslat() {
        window.gtag("consent", "update", {
            analytics_storage: "granted",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied"
        });

        const etiket = document.createElement("script");
        etiket.async = true;
        etiket.src = "https://www.googletagmanager.com/gtag/js?id=" + olcumKimligi;
        etiket.onload = function () {
            window.gtag("js", new Date());
            window.gtag("config", olcumKimligi, {
                allow_google_signals: false,
                allow_ad_personalization_signals: false
            });
        };
        document.head.appendChild(etiket);
    }

    function bildirimiGoster() {
        const bildirim = document.createElement("aside");
        bildirim.className = "cerez-bildirimi";
        bildirim.setAttribute("role", "dialog");
        bildirim.setAttribute("aria-label", "Analitik çerez tercihi");
        bildirim.innerHTML =
            '<div><strong>Ziyaretçi istatistikleri</strong>' +
            '<p>Siteyi geliştirmek için anonim ziyaret ve sayfa görüntüleme bilgilerini ölçmek istiyoruz.</p></div>' +
            '<div class="cerez-butonlari">' +
            '<button type="button" class="cerez-reddet">Reddet</button>' +
            '<button type="button" class="cerez-kabul">Kabul Et</button>' +
            '</div>';

        bildirim.querySelector(".cerez-kabul").addEventListener("click", function () {
            localStorage.setItem(izinAnahtari, "kabul");
            bildirim.remove();
            analitigiBaslat();
        });

        bildirim.querySelector(".cerez-reddet").addEventListener("click", function () {
            localStorage.setItem(izinAnahtari, "reddet");
            window.gtag("consent", "update", {
                analytics_storage: "denied",
                ad_storage: "denied",
                ad_user_data: "denied",
                ad_personalization: "denied"
            });
            bildirim.remove();
        });

        document.body.appendChild(bildirim);
    }

    const izin = localStorage.getItem(izinAnahtari);
    if (izin === "kabul") {
        analitigiBaslat();
    } else if (izin !== "reddet") {
        bildirimiGoster();
    }
})();
