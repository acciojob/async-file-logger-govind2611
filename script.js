const fileNames = [
  "file1.txt",
  "file2.txt",
  "file3.txt",
  "file4.txt",
  "file5.txt",
];

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

async function readFilesAsync() {
  const filePromises = fileNames.map(fetchFileContent);

  try {
    const fileContents = await Promise.all(filePromises);
    fileContents.forEach((content, index) => {
      console.log(`File ${index + 1}: ${content}`);
    });
  } catch (error) {
    console.error("Error reading files:", error);
  }
}

readFilesAsync();
