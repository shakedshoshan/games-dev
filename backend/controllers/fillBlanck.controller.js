import FillBlanck from '../models/fillBlanck.model.js';

// Fetch X random sentences
export const getRandomSentences = async (req, res) => {
  const { count } = req.params;

  try {
    const sentences = await FillBlanck.aggregate([
      { $unwind: "$sentences" },               // Unwind the array of sentences
      { $sample: { size: parseInt(count, 10) } } // Fetch random X sentences
    ]);

    if (sentences.length > 0) {
      res.json(sentences.map(item => item.sentences)); // Return the sentences
    } else {
      res.status(404).json({ message: 'No sentences found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sentences', error });
  }
};


// Add new sentences
export const addSentences = async (req, res) => {
    const { sentences } = req.body;
  
    if (!sentences || !Array.isArray(sentences)) {
      return res.status(400).json({ message: "Invalid sentences input" });
    }
  
    try {
      const fillBlanckEntry = await FillBlanck.findOne();
  
      if (fillBlanckEntry) {
        fillBlanckEntry.sentences.push(...sentences);
        await fillBlanckEntry.save();
        res.status(201).json({ message: "Sentences added successfully" });
      } else {
        const newEntry = new FillBlanck({ sentences });
        await newEntry.save();
        res.status(201).json({ message: "Sentences added successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error adding sentences', error });
    }
};

