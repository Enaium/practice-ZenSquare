import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot")
    id("io.spring.dependency-management")
    kotlin("jvm")
    kotlin("plugin.spring")
    kotlin("kapt")
    id("com.google.devtools.ksp")
}

val projectVersion: String by project
val projectGroup: String by project

group = projectGroup
version = projectVersion
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
    mavenCentral()
}

val jimmer: String by project
val mapstruct: String by project
val satoken: String by project
val springdoc: String by project
val therapi: String by project

dependencies {
    //jimmer
    implementation("org.babyfish.jimmer:jimmer-spring-boot-starter:$jimmer")
    ksp("org.babyfish.jimmer:jimmer-ksp:$jimmer")
    implementation("org.mapstruct:mapstruct:$mapstruct")
    kapt("org.mapstruct:mapstruct-processor:$mapstruct")
    kapt("org.babyfish.jimmer:jimmer-mapstruct-apt:$jimmer")

    //satoken
    implementation("cn.dev33:sa-token-spring-boot3-starter:$satoken")
    implementation("cn.dev33:sa-token-dao-redis-jackson:$satoken")
    implementation("org.apache.commons:commons-pool2")

    //springdoc
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:$springdoc")
    implementation("com.github.therapi:therapi-runtime-javadoc:$therapi")
    implementation("com.github.therapi:therapi-runtime-javadoc-scribe:$therapi")

    //springboot
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-aop")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.postgresql:postgresql")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "17"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}

kotlin {
    sourceSets.main {
        kotlin.srcDir("build/generated/ksp/main/kotlin")
    }
}

File(project.projectDir, "run").takeUnless  { it.exists() }?.mkdirs()