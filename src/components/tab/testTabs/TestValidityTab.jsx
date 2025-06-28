export default function TestValidityTab({ validity }) {
    if (!validity) return <p>فعلا محتوایی برای این صفحه نیست</p>
    
    return (
        <div className="space-y-3 bg-blue-50 p-4 rounded-xl text-gray-700 leading-relaxed">
            {validity
                ? <p>{validity}</p>
                : <p>اطلاعاتی درباره اعتبار آزمون ثبت نشده است.</p>}
        </div>
    );
}
