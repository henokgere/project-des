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
  const [binaryInput, setBinaryInput] = useState('')
  const [padded, setPadded] = useState('')
  const [encrypted, setEncrypted] = useState('')
  const [decrypted, setDecrypted] = useState('')
  const [decryptedText, setDecryptedText] = useState('')

const handleOperation = ()=>{
  const des = new DES(key);
  const obj = testDES(des, text)
  setBinaryInput(obj.binaryInput)
  setPadded(obj.padded)
  setEncrypted(obj.encrypted)
  setDecrypted(obj.decrypted)
  setDecryptedText(obj.decryptedText)
}

  return (
    <>
      <div style={{ padding: '20px' }}>
        <h2 style={{textAlign: 'center'}}>Simple Encryption/Decryption (DES-Like)</h2>
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
        <button onClick={handleOperation} style={{ marginTop: '10px', textAlign: 'center'}}>
          {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
        </button>
        <div>
          <h3>Results: </h3>
          {binaryInput&&<p>Text in binary: {binaryInput}</p>}
          {padded&&<p>Text in binary: {padded}</p>}
          {encrypted&&<p>Text in binary: {encrypted}</p>}
          {decrypted&&<p>Text in binary: {decrypted}</p>}
          {decryptedText&&<p>Text in binary: {decryptedText}</p>}
        </div>
      </div>
    </>
  )
}

export default App
