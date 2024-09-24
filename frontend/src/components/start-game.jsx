
import useJoinGame from '../hooks/useJoinGame';
import useCreateGame from '../hooks/useCreateGame';
import { useAuthContext } from '../context/AuthContext';
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function StartGameComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState(null)
  const { authUser } = useAuthContext();
  

  const handleOpenModal = (type) => {
    setModalType(type)
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
    setModalType(null)
  }

const { joinGame, isLoading: isLoading, gameData } = useJoinGame();
const { createGame, isLoading: isCreating, gameCode } = useCreateGame();

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  if (modalType === 'join') {
    const gameCode = formData.get('gameCode');
    // const playerName = formData.get('playerName');
    await joinGame(authUser, gameCode);
    if (gameData) {
      console.log('Joined game:', gameData);
    }
  } else {
    const gameName = formData.get('gameName');
    await createGame(authUser, gameName);
    if (gameCode) {
      console.log('Created game with code:', gameCode);
    }
  }
  handleCloseModal();
}


  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   const formData = new FormData(event.currentTarget)
  //   if (modalType === 'join') {
  //     const gameCode = formData.get('gameCode')
  //     console.log('Joining game with code:', gameCode)
  //     // Add logic to join the game
  //   } else {
  //     const gameName = formData.get('gameName')
  //     console.log('Creating game with name:', gameName)
  //     // Add logic to create the game
  //   }
  //   handleCloseModal()
  // }

  return (
    (<div
      className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold mb-8">Start Game</h1>
      <div className="space-x-4">
        <Button onClick={() => handleOpenModal('join')}>Join Game</Button>
        <Button onClick={() => handleOpenModal('create')}>Create Game</Button>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{modalType === 'join' ? 'Join Game' : 'Create Game'}</DialogTitle>
            <DialogDescription>
              {modalType === 'join' 
                ? 'Enter the game code to join an existing game.' 
                : 'Enter the count of sentences you want to play with.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor={modalType === 'join' ? 'gameCode' : 'gameName'}
                  className="text-right">
                  {modalType === 'join' ? 'Game Code' : 'Sentence Count'}
                </Label>
                <Input
                  id={modalType === 'join' ? 'gameCode' : 'gameName'}
                  name={modalType === 'join' ? 'gameCode' : 'gameName'}
                  className="col-span-3"
                  required />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{modalType === 'join' ? 'Join' : 'Create'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>)
  );
}