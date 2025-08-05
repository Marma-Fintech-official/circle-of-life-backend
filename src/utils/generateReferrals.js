export function generateReferId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomPart = '';
    
    for (let i = 0; i < 6; i++) { // 6 random characters
      randomPart += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return `R-${randomPart}`;
  }
  
  export async function getUniqueReferId(UserModel) {
    let referId;
    let exists = true;
  
    while (exists) {
      referId = generateReferId();
      // Check if it already exists
      const userWithReferId = await UserModel.findOne({ referId });
      exists = !!userWithReferId;
    }
  
    return referId;
  }
  


