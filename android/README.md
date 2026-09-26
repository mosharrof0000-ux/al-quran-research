# Android Edge-to-Edge Shell

এটি আল-কুরআন রিসার্চ ওয়েবসাইটের জন্য Android Native Kotlin WebView shell।

## Edge-to-edge লক্ষ্য
- Android 15/16-এর জন্য target SDK 36।
- Status bar ও navigation bar transparent।
- ওয়েবসাইটের visual canvas ঘড়ি/status icons এবং নিচের system navigation area-এর পেছন পর্যন্ত যায়।
- গুরুত্বপূর্ণ web content নিচের system navigation area-এর নিচে চাপা পড়ে না; system insets অনুযায়ী bottom safe padding দেওয়া হয়।
- Display cutout/landscape-এর left/right inset বিবেচনা করা হয়।
- Keyboard-এর জন্য adjustResize রাখা হয়েছে।
- Android 16-এর edge-to-edge opt-out ব্যবহার করা হয়নি।

## নিরাপত্তা
- মূল web/PWA UI এখানে কপি বা পরিবর্তন করা হয়নি।
- App শুধু canonical live site লোড করে।
- JavaScript ও DOM storage চালু আছে যাতে বর্তমান web app-এর chat/reader workflow কাজ করে।
- Delete বা destructive Android permission যোগ করা হয়নি।

## Build
GitHub Actions workflow .github/workflows/android-apk.yml debug APK তৈরি করে artifact হিসেবে প্রকাশ করে।

Package: com.mosharrof.alquranresearch
Version: 1.1.0
Target SDK: 36
