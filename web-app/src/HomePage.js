import React, { useState } from 'react';
import './HomePage.css';
import profilePic from './image.png';

function HomePage() {
  const [username, setUsername] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const checkUser = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('username', username);

      const response = await fetch('http://localhost/sprawdz_uzytkownika.php', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setUserStatus(data[0]); // Zakładając, że PHP zwraca tablicę z jednym komunikatem
    } catch (error) {
      setUserStatus('Błąd podczas sprawdzania użytkownika');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Sekcja sprawdzania użytkownika */}
      

      <img src={profilePic} alt="moj obrazek" className="profile-pic" />
      <center><h1>Piotr Wolff</h1></center>
      <p>Email: PiotrWolff@op.pl | Telefon: 123 456 789</p>
      
      <h2>Podsumowanie zawodowe</h2>
      <p>Doświadczony specjalista IT z 2-letnim stażem w tworzeniu aplikacji w technologii dotnet i zarządzaniu projektami.</p>
      
      <h2>Doświadczenie zawodowe</h2>
      <h3>Programista, firma xxx</h3>
      <ul>
        <li>Kierowałem 3 osobowym zespołem mającym dla aplikacji w czasie covida do ruszania się</li>
        <li>Zajmowałem się implementacją nowych funkcjonalności i layoutem aplikacji aplikacji</li>
      </ul>
      
      <h3>Informatyk, w zakładzie produkcyjnym</h3>
      <ul>
        <li>Uczestniczyłem w tworzeniu aplikacji do raportowania zdarzeń na produkcji</li>
        <li>Współpracowałem w tworzeniu i modernizacji strony internetowej firmy</li>
      </ul>
      
      <h2>Wykształcenie</h2>
      <p>Technik informatyk<br/>
      od 2021 do dnia dzisiejszego student na Uniwersytecie UKW</p>
      
      <h2>Umiejętności</h2>
      <ul>
        <li>Języki programowania: C#, Python, Java</li>
        <li>Frameworki: React, Mapper, EntityFramework, Pyautogui, Fresk</li>
        <li>Bazy danych: SQL managment studio, Oracle</li>
        <li>Narzędzia: Git, Docker</li>
        <li>Certyfikaty: EE09, EE08</li>
        <li>Ukończone kursy: Rest API, Tester oprogramowania</li>
      </ul>

      <div className="color-picker">
        <h2>Kolor tła</h2>
        <input type="color" onChange={(e) => document.body.style.backgroundColor = e.target.value} />
      </div>

      <div className="user-check-section">
        <h2>Sprawdź użytkownika</h2>
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Wprowadź nazwę użytkownika"
            className="border p-2 rounded"
          />
          <button
            onClick={checkUser}
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading ? 'Sprawdzanie...' : 'Sprawdź'}
          </button>
        </div>
        {userStatus && (
          <div className={`mb-4 p-3 rounded ${
            userStatus.includes('istnieje') ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {userStatus}
          </div>
        )}
      </div>
      <hr/>
      <h2>Rodo</h2>
      <h3>Zgadzam się na przetwarzanie moich danych w celach rekrutacyjn</h3>
    </div>
  );
}

export default HomePage;