const JUDGE0_API =
  "https://ce.judge0.com/submissions?base64_encoded=false&wait=true";

const LANGUAGE_IDS = {
  cpp: 54,
  javascript: 63,
  java: 62,
  python: 71,
};

export async function executeCode(language, code) {
  try {
    const languageId = LANGUAGE_IDS[language];

    if (!languageId) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const response = await fetch(JUDGE0_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP Error: ${response.status}`,
      };
    }

    const data = await response.json();

    if (data.compile_output) {
      return {
        success: false,
        error: data.compile_output,
      };
    }

    if (data.stderr) {
      return {
        success: false,
        error: data.stderr,
      };
    }

    return {
      success: true,
      output: data.stdout || "No Output",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
