import { toast } from "react-toastify";

export const getShareUrl = (podcastId) => {
    return `${window.location.origin}/podcast/${podcastId}`;
};

export const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url)
        .then(() => toast.success("لینک با موفقیت کپی شد!", {
            className: "font-bold"
        }))
        .catch(() => toast.error("کپی لینک با خطا مواجه شد!", {
            className: "font-bold"
        }));
};

export const shareOnTelegram = (title, url) => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
};

export const shareOnWhatsapp = (title, url) => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + "\n" + url)}`);
};

export const webShare = (title, description, url) => {
    if (navigator.share) {
        navigator.share({
            title,
            text: description.slice(0, 80) + "...",
            url,
        }).catch((err) => {
            console.error("Sharing failed", err);
            toast.error("اشتراک‌گذاری با خطا مواجه شد.", {
                className: "font-bold"
            });
        });
    } else {
        toast.info("اشتراک‌گذاری توسط مرورگر شما پشتیبانی نمی‌شود.", {
            className: "font-bold"
        });
    }
};
