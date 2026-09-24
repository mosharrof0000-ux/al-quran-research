plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.mosharrof.alquranresearch"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.mosharrof.alquranresearch"
        minSdk = 23
        targetSdk = 36
        versionCode = 3
        versionName = "1.2.0"
    }

    signingConfigs {
        create("ciDebug") {
            storeFile = file("ci-debug.keystore")
            storePassword = "al-quran-ci-debug"
            keyAlias = "androiddebugkey"
            keyPassword = "al-quran-ci-debug"
        }
    }

    buildTypes {
        debug {
            signingConfig = signingConfigs.getByName("ciDebug")
        }
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.16.0")
    implementation("androidx.activity:activity-ktx:1.10.1")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("androidx.webkit:webkit:1.13.0")
}
