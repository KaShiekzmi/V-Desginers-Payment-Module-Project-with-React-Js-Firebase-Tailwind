import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";


const ViewAllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://v-designers-b441a-default-rtdb.firebaseio.com/creditcards.json"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await response.json();

        if (data) {
          const transactionsArray = Object.entries(data).map(
            ([key, value]) => ({
              id: key,
              ...value,
            })
          );

          setTransactions(transactionsArray);
        } else {
          setTransactions([]);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.setProperties({
      title: "V-Designers - E-Statement",
    });
  
    pdf.setFontSize(18);
    pdf.text("V-Designers - E-Statement", 20, 20);
  
    const header = ["Transaction ID", "Card Holder", "Card Number", "Expiry Date", "CVC", "Amount", "Time"];
    const rows = transactions.map(transaction => [
      transaction.id,
      transaction.cardHolder,
      transaction.cardNumber,
      transaction.expiryDate,
      transaction.cvc,
      transaction.Amount,
      transaction.formattedDateTime
    ]);
  
    pdf.autoTable({
      startY: 40,
      head: [header],
      body: rows,
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontSize: 12 },
      bodyStyles: { fontSize: 10 },
    });
  
    pdf.save("e_statement.pdf");
  };
  

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="text-center mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
            View All Transactions
          </h1>
        </div>
        <div className="flex flex-wrap -mx-2">
          {loading ? (
            <p>Loading transactions...</p>
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id} className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                  <div>
                    <span className="title-font font-medium">
                      <strong>Card Holder:</strong> {transaction.cardHolder}
                    </span>
                    <br />
                    <span className="title-font font-medium">
                      <strong>Card Number:</strong> {transaction.cardNumber}
                    </span>
                    <br />
                    <span className="title-font font-medium">
                      <strong>Expiry Date:</strong> {transaction.expiryDate}
                    </span>
                    <br />
                    <span className="title-font font-medium">
                      <strong>CVC:</strong> {transaction.cvc}
                    </span>
                    <br />
                    <span className="title-font font-medium">
                      <strong>Amount:</strong> {transaction.Amount}
                    </span>
                    <br />
                    <span className="title-font font-medium">
                      <strong>Time:</strong> {transaction.formattedDateTime}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <button
          onClick={generatePDF}
          className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Generate E-Statement
        </button>
      </div>
    </section>
  );
};

export default ViewAllTransactions;
