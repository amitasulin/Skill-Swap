"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { ArrowLeft, Users, Zap, Star, CheckCircle } from "lucide-react";

export default function HomePage() {
  const currentUser = useStore((state) => state.currentUser);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Navigation */}
      <nav className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-primary-400" />
              <span className="mr-2 text-xl font-bold text-primary-400">
                Skill Swap
              </span>
            </div>
            <div className="flex items-center gap-4">
              {currentUser ? (
                <>
                  <Link
                    href="/profile"
                    className="text-gray-300 hover:text-primary-400"
                  >
                    הפרופיל שלי
                  </Link>
                  <Link
                    href="/matches/accepted"
                    className="text-gray-300 hover:text-primary-400"
                  >
                    ההתאמות שלי
                  </Link>
                  <Link
                    href="/matches"
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                  >
                    מצא התאמות
                  </Link>
                </>
              ) : (
                <Link
                  href="/auth"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
                >
                  התחבר / הירשם
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            החלף מיומנויות, למד בחינם
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Skill Swap מאפשרת לך ללמד מיומנויות שאתה יודע ולקבל בתמורה מיומנויות
            שאתה רוצה ללמוד. ללא עלות, ללא התחייבות - רק החלפת ידע איכותית.
          </p>
          {!currentUser && (
            <Link
              href="/auth"
              className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              התחל עכשיו - חינם
            </Link>
          )}
          {currentUser && (
            <Link
              href="/matches"
              className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              מצא מיומנות להתחלף
            </Link>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          איך זה עובד?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 text-center">
            <div className="bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-400">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              צור פרופיל
            </h3>
            <p className="text-gray-300">
              ציין מה אתה יודע ללמד ומה אתה רוצה ללמוד. הוסף את הזמינות שלך
              ואזור גיאוגרפי.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 text-center">
            <div className="bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-400">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">
              קבל התאמות
            </h3>
            <p className="text-gray-300">
              המערכת שלנו משתמשת ב-AI כדי למצוא לך התאמות מושלמות עם אנשים
              שמתאימים לך.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 text-center">
            <div className="bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-400">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">למד ותלמד</h3>
            <p className="text-gray-300">
              קבע שיעורים, צ'אט עם המורה שלך, ולמד מיומנויות חדשות תוך כדי שאתה
              מלמד אחרים.
            </p>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-gray-800 py-16 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            סיפורי הצלחה
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg border border-gray-600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-800 rounded-full flex items-center justify-center mr-3">
                  <Users className="h-6 w-6 text-primary-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">דני, סטודנט</h4>
                  <p className="text-sm text-gray-400">
                    לומד פיתוח, מלמד מתמטיקה
                  </p>
                </div>
              </div>
              <p className="text-gray-300">
                "למדתי React מ-3 אנשים שונים, ובתמורה לימדתי מתמטיקה. זה פשוט
                מושלם!"
              </p>
              <div className="flex items-center mt-4">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg border border-gray-600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-800 rounded-full flex items-center justify-center mr-3">
                  <Users className="h-6 w-6 text-primary-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">שרה, מעצבת</h4>
                  <p className="text-sm text-gray-400">
                    לומדת אנגלית, מלמדת עיצוב
                  </p>
                </div>
              </div>
              <p className="text-gray-300">
                "שיפרתי את האנגלית שלי תוך כדי שלימדתי עיצוב גרפי. קיבלתי גם ידע
                וגם חברים חדשים!"
              </p>
              <div className="flex items-center mt-4">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg border border-gray-600">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-800 rounded-full flex items-center justify-center mr-3">
                  <Users className="h-6 w-6 text-primary-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">יוסי, חובב גיטרה</h4>
                  <p className="text-sm text-gray-400">לומד יוגה, מלמד גיטרה</p>
                </div>
              </div>
              <p className="text-gray-300">
                "למדתי יוגה מחבר חדש, והוא למד גיטרה ממני. עכשיו אנחנו מנגנים
                יחד!"
              </p>
              <div className="flex items-center mt-4">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          למה Skill Swap?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-primary-400 mx-auto mb-4" />
            <h3 className="font-semibold mb-2 text-white">100% חינם</h3>
            <p className="text-gray-300 text-sm">ללא עלויות נסתרות</p>
          </div>
          <div className="text-center">
            <Zap className="h-12 w-12 text-primary-400 mx-auto mb-4" />
            <h3 className="font-semibold mb-2 text-white">התאמות AI</h3>
            <p className="text-gray-300 text-sm">מערכת חכמה למציאת התאמות</p>
          </div>
          <div className="text-center">
            <Users className="h-12 w-12 text-primary-400 mx-auto mb-4" />
            <h3 className="font-semibold mb-2 text-white">קהילה פעילה</h3>
            <p className="text-gray-300 text-sm">אלפי משתמשים מחפשים התאמות</p>
          </div>
          <div className="text-center">
            <Star className="h-12 w-12 text-primary-400 mx-auto mb-4" />
            <h3 className="font-semibold mb-2 text-white">דירוגים אמינים</h3>
            <p className="text-gray-300 text-sm">מערכת מוניטין שקופה</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Skill Swap. כל הזכויות שמורות.</p>
        </div>
      </footer>
    </div>
  );
}
