# Irish Warrior Sprite for T-Rex Game

## Required File
Place an Irish warrior sprite image named `warrior.png` in this directory.

## Image Requirements
- **Filename**: `warrior.png` (or `warrior.jpg`)
- **Recommended size**: 40x50 pixels to 80x100 pixels
- **Format**: PNG with transparent background (preferred) or JPG
- **Style**: Side-view/profile of a warrior (facing right)

## Where to Get Free Warrior Sprites

### Option 1: OpenGameArt.org (Recommended for Game Sprites)
1. Visit: https://opengameart.org/
2. Search: "warrior sprite" or "knight sprite" or "celtic warrior"
3. Filter by: "CC0" or "CC-BY" license
4. Download a sprite sheet or single image
5. If it's a sprite sheet, extract one frame
6. Resize to approximately 40x50 pixels
7. Rename to `warrior.png`

### Option 2: Itch.io Asset Packs
1. Visit: https://itch.io/game-assets/free
2. Search: "warrior sprite" or "pixel art knight"
3. Download free sprite packs
4. Extract a single warrior frame
5. Save as `warrior.png`

### Option 3: Create Your Own (Simple Pixel Art)
1. Use: https://www.piskelapp.com/ (free online pixel art editor)
2. Create a 40x50 pixel canvas
3. Draw a simple Irish warrior:
   - Green tunic/clothing
   - Shield
   - Sword or spear
   - Simple side-view profile
4. Export as PNG
5. Save as `warrior.png`

### Option 4: Free Sprite Generators
1. Use: https://sanderfrenken.github.io/Universal-LPC-Spritesheet-Character-Generator/
2. Customize a character with:
   - Green clothing (Irish colors)
   - Weapon and shield
   - Appropriate hair/beard
3. Generate and download
4. Extract a single walking frame
5. Crop and resize to ~40x50 pixels
6. Save as `warrior.png`

### Option 5: AI-Generated (Bing Image Creator)
1. Visit: https://www.bing.com/images/create
2. Prompt: "pixel art irish warrior sprite, side view, green tunic, shield, transparent background, simple style"
3. Download the best result
4. Crop and resize as needed
5. Save as `warrior.png`

## Quick Tip: Using Existing Images
If you have any warrior/knight image:
1. Open in image editor (Paint.NET, GIMP, or online: https://pixlr.com/)
2. Resize to 40-60 pixels wide, 50-80 pixels tall
3. Save as PNG
4. Place in this folder as `warrior.png`

## Alternative Names
If you use a different filename, update line in `game.component.ts`:
```typescript
this.warriorSprite.src = 'assets/game/YOUR_FILENAME.png';
```

## Current Setup
- The game expects: `src/assets/game/warrior.png`
- Falls back to rectangle graphics if sprite not found
- Sprite will be automatically scaled to fit the player size (40x50 pixels)

Once you add the warrior sprite, refresh the game to see your Irish warrior running! 🗡️🛡️
