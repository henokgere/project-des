import { useState } from 'react';
import { DES } from './des';

import './App.css'

function testDES(des: DES, input: string) {
  const plaintext = stringToBinary(input);
  const paddedPlaintext = DES.padInput(plaintext);

  console.log('Original: ' + input);
  console.log('Binary Input: ', plaintext);
  console.log('Padded: ' + paddedPlaintext);

  const encrypted = des.encrypt(paddedPlaintext);
  console.log('Encrypted: ' + encrypted);

  const decrypted = des.decrypt(encrypted);
  console.log('Decrypted: ' + decrypted);
  console.log('Decrypted (text): ' + binaryToString(DES.unpadInput(decrypted)));

  return { 'binaryInput': plaintext, 'padded': paddedPlaintext, 'encrypted': encrypted, 'decrypted': decrypted, 'decryptedText': binaryToString(DES.unpadInput(decrypted))}
}

function stringToBinary(str: string): string {
  return str
    .split('')
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');
}

function binaryToString(binary: string): string {
  const bytes = binary.match(/.{1,8}/g) || [];
  return bytes.map((byte) => String.fromCharCode(parseInt(byte, 2))).join('');
}

// function binaryToHex(binary: string): string {
//   return binary
//     .match(/.{1,4}/g)!
//     .map((nibble) => parseInt(nibble, 2).toString(16))
//     .join('');
// }
function App() {
  const [mode, setMode] = useState('encrypt')
  const [text, setText] = useState('')
  const [key, setKey] = useState('')
  const [result, setResult] = useState({})

const handleOperation = ()=>{
  const des = new DES(key);
  const obj = testDES(des, text)
  setResult(obj)
}

  return (
    <>
      <div style={{ padding: '20px' }}>
        <h2>Simple Encryption/Decryption (DES-Like)</h2>
        <div>
          <label>
            <input
              type="radio"
              value="encrypt"
              checked={mode === 'encrypt'}
              onChange={() => setMode('encrypt')}
            />
            Encrypt
          </label>
          <label style={{ marginLeft: '10px' }}>
            <input
              type="radio"
              value="decrypt"
              checked={mode === 'decrypt'}
              onChange={() => setMode('decrypt')}
            />
            Decrypt
          </label>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ marginTop: '10px', width: '100%' }}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Enter key (use + or -)"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            style={{ marginTop: '10px', width: '100%' }}
          />
        </div>
        <button onClick={handleOperation} style={{ marginTop: '10px' }}>
          {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
        </button>
        {Object.keys(result).length && 
        <div>
          <h3>Results: </h3>
          {result.binaryInput&&<p>Text in binary: {result.binaryInput}</p>}
          {result.padded&&<p>Text in binary: {result.padded}</p>}
          {result.encrypted&&<p>Text in binary: {result.encrypted}</p>}
          {result.decrypted&&<p>Text in binary: {result.decrypted}</p>}
          {result.decryptedText&&<p>Text in binary: {result.decryptedText}</p>}
        </div>
        }
      </div>
    </>
  )
}

export default App
