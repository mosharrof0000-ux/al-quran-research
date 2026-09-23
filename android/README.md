# Android Edge-to-Edge Shell

এই ফোল্ডারটি মূল আল-কুরআন রিসার্চ ওয়েব/PWA কোড থেকে আলাদা Android Native Kotlin WebView shell।

## নিরাপত্তা নীতি
- মূল `index.html`, `ui/`, `assets/`, PWA manifest এবং service worker এখানে পরিবর্তন করা হয়নি।
- Android shell শুধু বর্তমান live site লোড করে।
- Status Bar এবং Navigation Bar transparent করে Edge-to-Edge চালানো হয়েছে।
- `adjustResize` রাখা হয়েছে যাতে keyboard খুললে composer usable থাকে।

## Build
GitHub Actions workflow `.github/workflows/android-apk.yml` debug APK তৈরি করে artifact হিসেবে প্রকাশ করে।

Package: `com.mosharrof.alquranresearch`
