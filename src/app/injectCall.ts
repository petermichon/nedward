type Call = {
  name: string;
  args: { name: string; type: string }[];
};

// Inject a function call in the content
export function injectCall(content: string, call: Call): string {
  // Params
  let paramsInit = '';
  let paramsCall = '';
  let i = 0;
  for (const arg of call.args) {
    paramsInit += `  const ${arg.name}: ${arg.type} = Deno.args[${i}];\n`;
    paramsCall += `${arg.name}, `;
    i += 1;
  }
  // remove last ', '
  paramsCall = paramsCall.slice(0, -2);

  // Call
  const fnCall = `{\n${paramsInit}  console.log(${call.name}(${paramsCall}));\n}\n`;

  const result = content + '\n' + fnCall;
  return result;
}
