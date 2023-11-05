const fs = require('fs');
const yup = require('yup');

const projectSchema = yup.object().shape({
  title: yup.string().required(),
  shortDescription: yup.string().required(),
  longDescription: yup.string().required(),
  url: yup.string().url().required(),
  tags: yup.array().of(yup.string()).required(),
});

function validateJson(jsonData) {
  if (!Array.isArray(jsonData.projects)) {
    throw new Error('The "projects" field should be an array.');
  }

  jsonData.projects.forEach((project, index) => {
    try {
      projectSchema.validateSync(project, { abortEarly: false });
    } catch (validationError) {
      throw new Error(`Validation error in project entry at index ${index}: ${validationError.errors.join(', ')}`);
    }
  });

  console.log('JSON validation passed successfully.');
}

// Read and parse directory.json
const jsonData = JSON.parse(fs.readFileSync('directory.json', 'utf-8'));

// Validate JSON data
validateJson(jsonData);
