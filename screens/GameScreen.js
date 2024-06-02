import { useState, useEffect } from "react";
import { View, StyleSheet, Alert, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";


function generateRandomBetwean(min, max, exclude) {

   const rndNum = Math.floor(Math.random() * (max - min)) + min;

   if (rndNum === exclude) {
      return generateRandomBetwean(min, max, exclude);
   } else {
      return rndNum;
   }
   
}

let minBoundary = 1;
let maxBoundary = 100;
// let count = 0;

function GameScreen({userNumber, onGameOver}) {

   const initialGuess = generateRandomBetwean(1, 100, userNumber);
   const [currentGuess, setCurrentGuess] = useState(initialGuess);
   const [guessRounds, setGuessRounds] = useState([initialGuess]);
  

   useEffect(() => {
      if (currentGuess == userNumber) {
         onGameOver(guessRounds.length);
      }
   }, [currentGuess, userNumber, onGameOver]);

   useEffect(() => {
      minBoundary = 1;
      maxBoundary = 100;
   }, []);

   function nextGuessHandler(direction) {
      // direction => 'lover', 'greather'

      if (
         (direction == 'lover' && currentGuess < userNumber) || 
         (direction == 'greather' && currentGuess > userNumber)) {
         
         Alert.alert("Don't lie", 'You know that is wrong!', [
            {text: 'Sorry', style: 'cancel'},
         ]);
         return
      }

      if (direction == 'lover') {
         maxBoundary = currentGuess;
      } else {
         minBoundary = currentGuess + 1;
      }
      const newRndNum = generateRandomBetwean(minBoundary, maxBoundary, currentGuess);
      setCurrentGuess(newRndNum);
      setGuessRounds(prevGuessRounds => [newRndNum, ...prevGuessRounds]);
   
   }

   const guessRoundsListLenght = guessRounds.length;

   return (
      <View style={styles.screen}>
         <Title>Opponent's Guess</Title>
         <NumberContainer>{currentGuess}</NumberContainer>
         <Card>
            <InstructionText style={styles.instructionText} >HIgher or lover?</InstructionText>
            <View style={styles.buttonsContainer}>
               <View style={styles.buttonContainer}>
                  <PrimaryButton onPress={nextGuessHandler.bind(this, 'lover')}>
                     <Ionicons name="remove" size={24} color="white"/>
                  </PrimaryButton>
               </View>
               <View style={styles.buttonContainer}>
                  <PrimaryButton onPress={nextGuessHandler.bind(this, 'greather')}>
                     <Ionicons name="add-outline" size={24} color="white"/>  
                  </PrimaryButton>
               </View>
            </View>
         </Card>
         <View style={styles.listContainer}>
            <FlatList 
               data={guessRounds}
               renderItem={(itemData) =>
                   <GuessLogItem 
                     roundNumber={ guessRoundsListLenght - itemData.index} 
                     guess={itemData.item}
                  />}
               keyExtractor={(item) => item}
            />
         </View>
      </View>
   );
}

export default GameScreen;

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      padding: 24
   },
   instructionText: {
      marginBottom: 12
   },
   buttonsContainer: {
      flexDirection: 'row'
  },
  buttonContainer: {
      flex: 1
  },
  listContainer: {
   flex: 1,
   padding: 15
  }
});