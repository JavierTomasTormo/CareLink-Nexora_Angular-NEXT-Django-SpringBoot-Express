plugins {
    id("java")
    id("org.springframework.boot") version "3.1.0" // Cambia según la última versión
    id("io.spring.dependency-management") version "1.1.0"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_17 // Versión de Java que estás usando

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")      // Spring Web
    implementation("org.springframework.boot:spring-boot-starter-data-jpa") // JPA
    implementation("org.postgresql:postgresql")                             // PostgreSQL Driver
    developmentOnly("org.springframework.boot:spring-boot-devtools")        // DevTools
    testImplementation("org.springframework.boot:spring-boot-starter-test") // Dependencias para test
}

tasks.named<Test>("test") {
    useJUnitPlatform()
}
