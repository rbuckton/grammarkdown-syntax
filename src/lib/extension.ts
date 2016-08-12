import { workspace, Disposable, ExtensionContext, FileSystemWatcher, } from "vscode";
import { LanguageClient, LanguageClientOptions, SettingMonitor, ServerOptions, TransportKind, NodeModule, ForkOptions } from "vscode-languageclient";
import { FileChangeType, FileEvent } from "vscode-languageclient/lib/protocol";

export function activate(context: ExtensionContext) {
    const module = context.asAbsolutePath("server/lib/server.js");
    const transport = TransportKind.ipc;
    const options: ForkOptions = { execArgv: ["--nolazy", "--debug=6004"] };
    const run: NodeModule = { module, transport };
    const debug: NodeModule = { module, transport, options };
    const serverOptions: ServerOptions = { run, debug };
    const clientOptions: LanguageClientOptions = { documentSelector: ['grammarkdown'] };
    const client = new LanguageClient("Grammarkdown Language Client", serverOptions, clientOptions)
    context.subscriptions.push(client.start());
}