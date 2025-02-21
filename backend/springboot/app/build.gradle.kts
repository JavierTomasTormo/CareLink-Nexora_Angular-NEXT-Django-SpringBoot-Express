plugins {
    id("org.springframework.boot") version "3.2.1"
    id("io.spring.dependency-management") version "1.1.4"
    id("java")
}

group = "com.carelink"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
    mavenCentral()
}

dependencies {
    // Starter para aplicaciones web
    implementation("org.springframework.boot:spring-boot-starter-web")

    // Starter para JPA/Hibernate
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")

    // Starter para Spring Security
    implementation("org.springframework.boot:spring-boot-starter-security")

    // Dependencias de JWT (Para manejar JWT)
    implementation("io.jsonwebtoken:jjwt-api:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.11.5")

    // Driver para PostgreSQL
    runtimeOnly("org.postgresql:postgresql:42.2.23")

    // Lombok para reducir código boilerplate
    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")

    // Herramientas de desarrollo para reinicios automáticos
    developmentOnly("org.springframework.boot:spring-boot-devtools")

    // Dependencias para pruebas
    testImplementation("org.springframework.boot:spring-boot-starter-test")

    // Dependencias adicionales
    implementation("javax.annotation:javax.annotation-api:1.3.2")
    implementation("javax.servlet:javax.servlet-api:4.0.1")

    // Stripe Payments
    implementation("com.stripe:stripe-java:22.16.0")

}

tasks.named<Jar>("bootJar") {
    enabled = true
    exclude("org/springframework/boot/devtools/**")
}

tasks.named<Test>("test") {
    useJUnitPlatform()
}