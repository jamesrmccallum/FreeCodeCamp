## Logic

A game has a grid of NxN squares, accessible by cartesian coordinates (implemented as a Vector type)

### State 
A game has a player:

    - The game grid must know the player's position.
    - The game grid must know the position of various actors.
    - The game must track the player's state


A game has other stateful actors (enemies, bosses)

    - A player and an enemy, and a wall etc etc can be implemented as a worldobject
    - The player must have stats available to the game
        - Should this state object be passed down from the top?
            - Maybe the player can be instantiated at the top and passed down
        - Or should the game just save a reference to the player, and query that?

A game must have turns

    - While i'm adjacent to an enemy, it must damage me (not just while i'm barging it)
    - For this I need a game loop
        - The game 'turns' and redraws the world.
            - The world looks at the player, finds all collisions, and calls interact both ways (monster -> player, player -> monster)

A game has power ups, health, weapons

The game tracks the player's position, and checks for collisions each time the player moves

