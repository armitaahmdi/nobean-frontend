import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function CourseInstructorCard({ course }) {
    const { name, title, avatar, bio, achievements, socials } = course.instructor;

    return (
        <div className="bg-white mb-6 p-6 sm:p-8 rounded-2xl shadow-md flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start border border-gray-100">
            {/* تصویر مدرس */}
            <div className="shrink-0 flex flex-col items-center">
                <img
                    src={avatar}
                    alt={name}
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-100 shadow"
                />
                {/* شبکه‌های اجتماعی */}
                {(socials?.instagram || socials?.linkedin) && (
                    <div className="flex justify-center sm:justify-start gap-4 mt-10 text-blue-600">
                        {socials.instagram && (
                            <a
                                href={socials.instagram}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-pink-500 transition-colors text-3xl"
                            >
                                <FaInstagram />
                            </a>
                        )}
                        {socials.linkedin && (
                            <a
                                href={socials.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-blue-700 transition-colors text-3xl"
                            >
                                <FaLinkedin />
                            </a>
                        )}
                    </div>
                )}
            </div>

            {/* اطلاعات مدرس */}
            <div className="flex-1 space-y-3 text-center sm:text-right">
                <h3 className="text-2xl font-semibold text-gray-800">{name}</h3>
                <p className="text-blue-600 text-sm font-medium">{title}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{bio}</p>

                {/* لیست افتخارات */}
                {achievements?.length > 0 && (
                    <ul className="text-sm text-gray-600 list-disc list-inside mt-2 space-y-1">
                        {achievements.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
