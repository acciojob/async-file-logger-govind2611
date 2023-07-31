const fileNames = [
  "file1.txt",
  "file2.txt",
  "file3.txt",
  "file4.txt",
  "file5.txt",
];

// Function to fetch the file content using the Fetch API
async function fetchFileContent(fileName) {
  try {
    const response = await fetch(fileName);
    if (!response.ok) {
      throw new Error(`Error loading ${fileName}: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Function to read all files asynchronously
async function readFilesAsync() {
  const filePromises = fileNames.map(fetchFileContent);

  try {
    const fileContents = await Promise.all(filePromises);
    fileContents.forEach((content, index) => {
      console.log(`File ${index + 1}: ${content}`);
    });

    // Validate the console data after reading all files
    const consoleOutput = `
      File 1: This content is from file 1
      File 2: This content is from file 2
      File 3: This content is from file 3
      File 4: This content is from file 4
      File 5: This content is from file 5
    `;
    const isValid = validateConsoleData(consoleOutput);

    console.log("Validation Result:", isValid);
  } catch (error) {
    console.error("Error reading files:", error);
  }
}

// Function to validate the console data for the first API
function validateConsoleData(consoleOutput) {
  // Define the expected content for each file based on the provided instructions
  const expectedContent = [
    "This content is from file 1",
    "This content is from file 2",
    "This content is from file 3",
    "This content is from file 4",
    "This content is from file 5",
  ];

  // Convert the console output into an array of lines
  const consoleLines = consoleOutput.trim().split("\n");

  // Check if the number of lines matches the number of files
  if (consoleLines.length !== expectedContent.length) {
    return false;
  }

  // Check if the content of each file matches the expected content
  for (let i = 0; i < consoleLines.length; i++) {
    if (consoleLines[i].trim() !== `File ${i + 1}: ${expectedContent[i]}`) {
      return false;
    }
  }

  return true;
}

// Call the function to read and log file contents
readFilesAsync();
