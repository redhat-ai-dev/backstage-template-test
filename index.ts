import nunjucks, { render } from 'nunjucks';
import path from 'path';
import * as fs from 'fs';
import { template } from '@babel/core';

// renderTemplates takes in a given templated file, and a list of json-formatted values, and returns the rendered template
export function RenderTemplates(filePath: string, values: object): string {
    let parentDir:string = path.dirname(filePath);
    let fileName:string = path.basename(filePath);

    nunjucks.configure(parentDir, { autoescape: true });
    return nunjucks.render(fileName, values);
}

// testFileMatchesTemplate uses jest and nunjucks to validate that a given template matches the test data when rendered
export function TestFileMatchesTemplate(testFilePath: string, templateFilePath: string, values: object) {
    let testFile = fs.readFileSync(testFilePath, 'utf8');
    let renderedTemplateFile = RenderTemplates(templateFilePath, values)
    expect(renderedTemplateFile).toEqual(testFile);
}

// TestFolderMatchesTemplate uses jest and nunjucks to validate that an entire folder of templated resources match the test data
// Set recursive: true to include subfolders
export function TestFolderMatchesTemplate(testFolderPath: string, templateFolderPath: string, values: object, recursive: boolean) {

    fs.readdir(testFolderPath, (err, files) => {
        files.forEach(file => {
            const testFilePath: string = path.join(testFolderPath, file)
            const isDirectory: boolean = fs.lstatSync(testFilePath).isDirectory()

            if (!isDirectory) {
                // Evaluate the template for the current file
                // To simplify things currently - assume that the template file name is the same as the corresponding test data file name
                let templateFile: string = path.join(templateFolderPath, file)
                TestFileMatchesTemplate(testFilePath, templateFile, values)
            } else if (isDirectory && recursive) {
                const templateSubFolderPath: string = path.join(templateFolderPath, file)
                TestFolderMatchesTemplate(testFilePath, templateSubFolderPath, values, true)
            }
        });
    });
}