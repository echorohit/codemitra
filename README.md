# CodeMitra - Your Intelligent Coding Assistant

Welcome to **CodeMitra**, your intelligent coding assistant for VS Code. CodeMitra integrates AI-powered inference services such as OpenAI, SambaNova, and Groq, allowing you to get code analysis, suggestions, optimizations, and insights directly within your favorite code editor.

## Features

- **AI-Powered Code Suggestions**: Get real-time suggestions for improvements in your code for languages like JavaScript, Python, HTML, JSON, and more.
- **Code Analysis**: Receive detailed feedback and optimizations for the code you write.
- **Multi-Provider Support**: Easily switch between popular AI inference services, such as OpenAI, SambaNova, and Groq.
- **Customizable**: Configure API keys for each provider and manage your preferences with ease.
- **User-Friendly Interface**: Simple commands and an intuitive UI to make the most out of AI-powered assistance in your projects.

### Example of Code Suggestion

Coming Up

### Inference Results Panel

Coming Up

> Tip: Use CodeMitra to find bugs, optimize code, and get real-time feedback on your scripts.

## Requirements

- Visual Studio Code version 1.60.0 or higher.
- API keys from the supported AI services:
  - **OpenAI**
  - **SambaNova**
  - **Groq**

Ensure you have active accounts and valid API keys for these services. API keys can be configured within the extension settings.

## Installation

1. Install CodeMitra from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/vscode).
2. Go to the **Settings** in VS Code.
3. Configure your preferred AI provider (OpenAI, SambaNova, or Groq) and provide the respective API keys.

## Extension Settings

CodeMitra provides the following configuration settings:

- `codemitra.inferenceProvider`: Select the AI inference provider (OpenAI, SambaNova, Groq).
- `codemitra.apiKey.openAI`: Set your OpenAI API key.
- `codemitra.apiKey.sambaNova`: Set your SambaNova API key.
- `codemitra.apiKey.groq`: Set your Groq API key.

## How to Use CodeMitra

1. Open a file in VS Code.
2. Run the **Run Inference** command via the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
3. Choose the provider and see the real-time AI-generated suggestions, code analysis, and results in the output panel.

## Known Issues

- Currently supports only a limited number of languages (JavaScript, Python, HTML, JSON).
- Large files may take longer to process, depending on the inference service and internet connection.

## Release Notes

### 1.0.0
- Initial release of CodeMitra with support for OpenAI, SambaNova, and Groq.

---

## Contributing

We welcome contributions to improve CodeMitra. Feel free to open issues or pull requests on our [GitHub repository](https://github.com/echorohit/codemitra).

## Support and Feedback

If you encounter any issues or have suggestions, please file an issue on [GitHub](https://github.com/your-repo-link/issues) or contact us through [email@example.com](mailto:email@example.com).

---

### Resources for Developers

- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
- [Visual Studio Code API Documentation](https://code.visualstudio.com/api)
- [AI Service Providers](https://openai.com/, https://sambanova.com/, https://groq.com/)

**Happy Coding with CodeMitra!**
