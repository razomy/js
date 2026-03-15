import * as fss from '@razomy/fss';
import * as fs from 'fs';
import * as path from 'path';

// Укажите языки, с которыми будете работать
// ВАЖНО: Убедитесь, что для пары существует модель Xenova/opus-mt-{src}-{tgt}
const LANGUAGES = ['en', 'ru', 'de', 'fr'];
const OUTPUT_DIR = path.resolve('');

function generateTranslationStructure() {
    // 1. Создаем папку, если ее нет
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, {recursive: true});
    }

    // 2. Создаем базовый движок (Кэширование + Transformers.js)
    const engineCode = `import { pipeline } from '@xenova/transformers';

// Кэш для хранения загруженных ИИ-моделей
const modelsCache = new Map<string, any>();

export async function translateText(text: string, src: string, tgt: string): Promise<string> {
    const modelName = \`Xenova/opus-mt-\${src}-\${tgt}\`;
    
    // Загружаем модель только 1 раз
    if (!modelsCache.has(modelName)) {
        console.log(\`Загрузка модели \${modelName}...\`);
        const translator = await pipeline('translation', modelName);
        modelsCache.set(modelName, translator);
    }
    
    const translator = modelsCache.get(modelName);
    const result = await translator(text);
    return result[0].translation_text;
}
`;
    fs.writeFileSync(path.join(OUTPUT_DIR, 'translateText.ts'), engineCode);

    let indexCode = '';

    // 3. Генерируем файлы для каждого языка (en.ts, ru.ts и т.д.)
    for (const sourceLang of LANGUAGES) {
        fss.directory.tryCreate(path.join(OUTPUT_DIR, `${sourceLang}`));

        let indexFileCode = ``;

        for (const targetLang of LANGUAGES) {
            // Пропускаем перевод на самого себя (например, en -> en)
            if (sourceLang === targetLang) continue;
            let fileCode = `import { translateText } from '../translateText';\n\n`;

            fileCode += `/**\n`;
            fileCode += ` * Перевод с ${sourceLang.toUpperCase()} на ${targetLang.toUpperCase()}\n`;
            fileCode += ` */\n`;
            fileCode += `export async function ${targetLang}(text: string): Promise<string> {\n`;
            fileCode += `    return await translateText(text, '${sourceLang}', '${targetLang}');\n`;
            fileCode += `}\n\n`;
            indexFileCode += `export { ${targetLang} } from './${targetLang}';\n`;
            // Записываем файл языка (например, translations/en.ts)
            fs.writeFileSync(path.join(OUTPUT_DIR, `${sourceLang}/${targetLang}.ts`), fileCode);
        }
        fs.writeFileSync(path.join(OUTPUT_DIR, `${sourceLang}/index.ts`), indexFileCode);

        // Добавляем запись в index.ts как namespace, чтобы не было конфликтов имен
        indexCode += `export * as ${sourceLang} from "./${sourceLang}";\n`;
    }

    // 4. Записываем index.ts
    fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), indexCode);
    console.log('✅ Структура для переводов успешно сгенерирована!');
}

// Запускаем генератор
generateTranslationStructure();