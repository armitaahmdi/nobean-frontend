import { FaTrash, FaGripVertical } from "react-icons/fa";

// Heading Component
export function HeadingSection({ section, onUpdate, onDelete, onMoveUp, onMoveDown, canMoveUp, canMoveDown }) {
    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <FaGripVertical className="text-gray-400 cursor-move" />
                    <span className="text-sm font-medium text-blue-700">تیتر</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onMoveUp}
                        disabled={!canMoveUp}
                        className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                        ↑
                    </button>
                    <button
                        onClick={onMoveDown}
                        disabled={!canMoveDown}
                        className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                        ↓
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-1 text-red-500 hover:text-red-700"
                    >
                        <FaTrash size={12} />
                    </button>
                </div>
            </div>
            
            <div className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        سطح تیتر
                    </label>
                    <select
                        value={section.level || 2}
                        onChange={(e) => onUpdate({ ...section, level: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value={1}>سطح 1 (بزرگ)</option>
                        <option value={2}>سطح 2 (متوسط)</option>
                        <option value={3}>سطح 3 (کوچک)</option>
                        <option value={4}>سطح 4 (خیلی کوچک)</option>
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        متن تیتر
                    </label>
                    <input
                        type="text"
                        value={section.text || ""}
                        onChange={(e) => onUpdate({ ...section, text: e.target.value })}
                        placeholder="عنوان تیتر را وارد کنید..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
    );
}

// Text Component
export function TextSection({ section, onUpdate, onDelete, onMoveUp, onMoveDown, canMoveUp, canMoveDown }) {
    return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <FaGripVertical className="text-gray-400 cursor-move" />
                    <span className="text-sm font-medium text-green-700">متن</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onMoveUp}
                        disabled={!canMoveUp}
                        className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                        ↑
                    </button>
                    <button
                        onClick={onMoveDown}
                        disabled={!canMoveDown}
                        className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                        ↓
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-1 text-red-500 hover:text-red-700"
                    >
                        <FaTrash size={12} />
                    </button>
                </div>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    محتوای متن
                </label>
                <textarea
                    value={section.text || ""}
                    onChange={(e) => onUpdate({ ...section, text: e.target.value })}
                    placeholder="محتوای متن را وارد کنید..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>
        </div>
    );
}

// Image Component
export function ImageSection({ section, onUpdate, onDelete, onMoveUp, onMoveDown, canMoveUp, canMoveDown }) {
    return (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <FaGripVertical className="text-gray-400 cursor-move" />
                    <span className="text-sm font-medium text-purple-700">تصویر</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onMoveUp}
                        disabled={!canMoveUp}
                        className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                        ↑
                    </button>
                    <button
                        onClick={onMoveDown}
                        disabled={!canMoveDown}
                        className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                        ↓
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-1 text-red-500 hover:text-red-700"
                    >
                        <FaTrash size={12} />
                    </button>
                </div>
            </div>
            
            <div className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        آدرس تصویر
                    </label>
                    <input
                        type="url"
                        value={section.src || ""}
                        onChange={(e) => onUpdate({ ...section, src: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        متن جایگزین (Alt Text)
                    </label>
                    <input
                        type="text"
                        value={section.alt || ""}
                        onChange={(e) => onUpdate({ ...section, alt: e.target.value })}
                        placeholder="توضیح تصویر..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        زیرنویس تصویر
                    </label>
                    <input
                        type="text"
                        value={section.caption || ""}
                        onChange={(e) => onUpdate({ ...section, caption: e.target.value })}
                        placeholder="زیرنویس تصویر (اختیاری)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                
                {section.src && (
                    <div className="mt-3">
                        <img 
                            src={section.src} 
                            alt={section.alt || ""} 
                            className="max-w-full h-32 object-cover rounded border"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

// List Component
export function ListSection({ section, onUpdate, onDelete, onMoveUp, onMoveDown, canMoveUp, canMoveDown }) {
    const addItem = () => {
        const newItems = [...(section.items || []), ""];
        onUpdate({ ...section, items: newItems });
    };

    const updateItem = (index, value) => {
        const newItems = [...(section.items || [])];
        newItems[index] = value;
        onUpdate({ ...section, items: newItems });
    };

    const removeItem = (index) => {
        const newItems = (section.items || []).filter((_, i) => i !== index);
        onUpdate({ ...section, items: newItems });
    };

    return (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <FaGripVertical className="text-gray-400 cursor-move" />
                    <span className="text-sm font-medium text-orange-700">لیست</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onMoveUp}
                        disabled={!canMoveUp}
                        className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                        ↑
                    </button>
                    <button
                        onClick={onMoveDown}
                        disabled={!canMoveDown}
                        className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                        ↓
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-1 text-red-500 hover:text-red-700"
                    >
                        <FaTrash size={12} />
                    </button>
                </div>
            </div>
            
            <div className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        نوع لیست
                    </label>
                    <select
                        value={section.ordered ? "ordered" : "unordered"}
                        onChange={(e) => onUpdate({ ...section, ordered: e.target.value === "ordered" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option value="unordered">لیست نقطه‌ای</option>
                        <option value="ordered">لیست شماره‌دار</option>
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        آیتم‌های لیست
                    </label>
                    <div className="space-y-2">
                        {(section.items || []).map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={item}
                                    onChange={(e) => updateItem(index, e.target.value)}
                                    placeholder={`آیتم ${index + 1}`}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <button
                                    onClick={() => removeItem(index)}
                                    className="p-2 text-red-500 hover:text-red-700"
                                >
                                    <FaTrash size={12} />
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={addItem}
                            className="w-full py-2 border-2 border-dashed border-orange-300 rounded-md text-orange-600 hover:border-orange-400 hover:text-orange-700"
                        >
                            + افزودن آیتم جدید
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Blockquote Component
export function BlockquoteSection({ section, onUpdate, onDelete, onMoveUp, onMoveDown, canMoveUp, canMoveDown }) {
    return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <FaGripVertical className="text-gray-400 cursor-move" />
                    <span className="text-sm font-medium text-yellow-700">نقل‌قول</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onMoveUp}
                        disabled={!canMoveUp}
                        className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                        ↑
                    </button>
                    <button
                        onClick={onMoveDown}
                        disabled={!canMoveDown}
                        className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                        ↓
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-1 text-red-500 hover:text-red-700"
                    >
                        <FaTrash size={12} />
                    </button>
                </div>
            </div>
            
            <div className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        متن نقل‌قول
                    </label>
                    <textarea
                        value={section.text || ""}
                        onChange={(e) => onUpdate({ ...section, text: e.target.value })}
                        placeholder="متن نقل‌قول را وارد کنید..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        نویسنده نقل‌قول (اختیاری)
                    </label>
                    <input
                        type="text"
                        value={section.author || ""}
                        onChange={(e) => onUpdate({ ...section, author: e.target.value })}
                        placeholder="نام نویسنده..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>
            </div>
        </div>
    );
}

// Video Component
export function VideoSection({ section, onUpdate, onDelete, onMoveUp, onMoveDown, canMoveUp, canMoveDown }) {
    return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <FaGripVertical className="text-gray-400 cursor-move" />
                    <span className="text-sm font-medium text-red-700">ویدیو</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onMoveUp}
                        disabled={!canMoveUp}
                        className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                        ↑
                    </button>
                    <button
                        onClick={onMoveDown}
                        disabled={!canMoveDown}
                        className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    >
                        ↓
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-1 text-red-500 hover:text-red-700"
                    >
                        <FaTrash size={12} />
                    </button>
                </div>
            </div>
            
            <div className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        آدرس ویدیو
                    </label>
                    <input
                        type="url"
                        value={section.src || ""}
                        onChange={(e) => onUpdate({ ...section, src: e.target.value })}
                        placeholder="https://example.com/video.mp4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        زیرنویس ویدیو
                    </label>
                    <input
                        type="text"
                        value={section.caption || ""}
                        onChange={(e) => onUpdate({ ...section, caption: e.target.value })}
                        placeholder="زیرنویس ویدیو (اختیاری)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>
                
                {section.src && (
                    <div className="mt-3">
                        <video 
                            src={section.src} 
                            controls 
                            className="max-w-full h-32 rounded border"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        >
                            مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.
                        </video>
                    </div>
                )}
            </div>
        </div>
    );
}
