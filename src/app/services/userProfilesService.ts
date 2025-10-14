
import { getDb, initDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import {UserInterface,ProfileInterface,ArtisanInterface} from "../types/interfacesModels";

export class UserService {
  private static db: any;

  private static async getCollection(collectionName: string) {
    if (!this.db) {
      await initDb();
      this.db = getDb();
    }
    return this.db.collection(collectionName);
  }

  static async getAllUsers(): Promise<UserInterface[]> {
    const collection = await this.getCollection("user");
    const users = await collection.find({}).toArray();
    return users.map(this.serializeUser);
  }

  static async getUserById(id: string): Promise<UserInterface | null> {
    const collection = await this.getCollection("user");
    const user = await collection.findOne({ _id: new ObjectId(id) });
    return user ? this.serializeUser(user) : null;
  }

  static async getUserByUserId(userId: number): Promise<UserInterface | null> {
    const collection = await this.getCollection("user");
    const user = await collection.findOne({ user_id: userId });
    return user ? this.serializeUser(user) : null;
  }

  static async getUserByEmail(email: string): Promise<UserInterface | null> {
    const collection = await this.getCollection("user");
    const user = await collection.findOne({ email: email.toLowerCase() });
    return user ? this.serializeUser(user) : null;
  }

  static async createUser(userData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }): Promise<UserInterface> {
    const collection = await this.getCollection("user");
    
    const lastUser = await collection.find().sort({ user_id: -1 }).limit(1).toArray();
    const nextUserId = lastUser.length > 0 ? lastUser[0].user_id + 1 : 1;
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const newUser = {
      user_id: nextUserId,
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email.toLowerCase(),
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date()
    };

    const result = await collection.insertOne(newUser);
    
    return {
      _id: result.insertedId.toString(),
      ...newUser
    };
  }

  static async updateUser(userId: number, updateData: Partial<UserInterface>): Promise<boolean> {
    const collection = await this.getCollection("user");
    const result = await collection.updateOne(
      { user_id: userId },
      { 
        $set: {
          ...updateData,
          updated_at: new Date()
        }
      }
    );
    return result.modifiedCount > 0;
  }

  // ========== PROFILE COLLECTION ==========
  static async getAllProfiles(): Promise<ProfileInterface[]> {
    const collection = await this.getCollection("profile");
    const profiles = await collection.find({}).toArray();
    return profiles.map(this.serializeProfile);
  }

  static async getProfileByUserId(userId: number): Promise<ProfileInterface | null> {
    const collection = await this.getCollection("profile");
    const profile = await collection.findOne({ user_id: userId });
    return profile ? this.serializeProfile(profile) : null;
  }

  static async getProfileWithUser(userId: number): Promise<{
    user: UserInterface;
    profile: ProfileInterface;
  } | null> {
    const [user, profile] = await Promise.all([
      this.getUserByUserId(userId),
      this.getProfileByUserId(userId)
    ]);

    if (!user) return null;

    return {
      user,
      profile: profile || await this.createDefaultProfile(userId)
    };
  }

  static async createProfile(profileData: {
    user_id: number;
    background_pic?: string;
    profile_picture?: string;
    Artisan_Artisan_id?: number;
  }): Promise<ProfileInterface> {
    const collection = await this.getCollection("profile");
    
    const lastProfile = await collection.find().sort({ profile_id: -1 }).limit(1).toArray();
    const nextProfileId = lastProfile.length > 0 ? lastProfile[0].profile_id + 1 : 1;

    const newProfile = {
      profile_id: nextProfileId,
      created_at: new Date(),
      background_pic: profileData.background_pic,
      profile_picture: profileData.profile_picture,
      user_id: profileData.user_id,
      Artisan_Artisan_id: profileData.Artisan_Artisan_id
    };

    const result = await collection.insertOne(newProfile);
    
    return {
      _id: result.insertedId.toString(),
      ...newProfile
    };
  }

  private static async createDefaultProfile(userId: number): Promise<ProfileInterface> {
    return this.createProfile({
      user_id: userId,
      background_pic: undefined,
      profile_picture: undefined
    });
  }

  // ========== ARTISAN COLLECTION ==========
  static async getAllArtisans(): Promise<ArtisanInterface[]> {
    const collection = await this.getCollection("artisan");
    const artisans = await collection.find({}).toArray();
    return artisans.map(this.serializeArtisan);
  }

  static async getArtisanById(artisanId: number): Promise<ArtisanInterface | null> {
    const collection = await this.getCollection("artisan");
    const artisan = await collection.findOne({ Artisan_id: artisanId });
    return artisan ? this.serializeArtisan(artisan) : null;
  }

  static async getArtisanByUserId(userId: number): Promise<ArtisanInterface | null> {
    const collection = await this.getCollection("artisan");
    const artisan = await collection.findOne({ user_id: userId });
    return artisan ? this.serializeArtisan(artisan) : null;
  }

  static async authenticateUser(email: string, password: string): Promise<{
    user: UserInterface;
    profile: ProfileInterface;
    artisan?: ArtisanInterface;
  } | null> {
    const user = await this.getUserByEmail(email);
    console.log("Usuario conseguido en authenticateUser:", user); 
    if (!user) return null;

    if (!user.password) return null;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("¿Contraseña válida?:", isPasswordValid);
    if (!isPasswordValid) return null;

    const profile = await this.getProfileByUserId(user.user_id) || 
                   await this.createDefaultProfile(user.user_id);

    const artisanResult = await this.getArtisanByUserId(user.user_id);
    console.log("Artisan conseguido en authenticateUser:", artisanResult);
    const artisan = artisanResult ?? undefined;

    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      profile,
      artisan
    };
  }

  static async registerUser(userData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }): Promise<{
    user: UserInterface;
    profile: ProfileInterface;
  }> {
    const existingUser = await this.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const user = await this.createUser(userData);
    
    const profile = await this.createDefaultProfile(user.user_id);

    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      profile
    };
  }

  private static serializeUser(user: any): UserInterface {
    return {
      _id: user._id?.toString(),
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
  }

  private static serializeProfile(profile: any): ProfileInterface {
    return {
      _id: profile._id?.toString(),
      profile_id: profile.profile_id,
      created_at: profile.created_at,
      background_pic: profile.background_pic,
      profile_picture: profile.profile_picture,
      user_id: profile.user_id,
      Artisan_Artisan_id: profile.Artisan_Artisan_id
    };
  }

  private static serializeArtisan(artisan: any): ArtisanInterface {
    return {
      _id: artisan._id?.toString(),
      Artisan_id: artisan.Artisan_id,
      first_name: artisan.first_name,
      last_name: artisan.last_name,
      biography: artisan.biography,
      user_id: artisan.user_id
    };
  }
/*static async fixDataInconsistency(): Promise<{ message: string; changes: number }> {
  try {
    console.log('🔄 Iniciando corrección de inconsistencia de datos...');
    
    const artisansCollection = await this.getCollection("artisan");
    let changes = 0;

    // 1. ELIMINAR artisans 4 y 5 (Fatima y Arthur que no coinciden con usuarios)
    const deleteResult = await artisansCollection.deleteMany({ 
      Artisan_id: { $in: [4, 5] } 
    });
    
    changes += deleteResult.deletedCount;
    console.log(`✅ Eliminados ${deleteResult.deletedCount} artisans inconsistentes`);

    // 2. VERIFICAR que solo quedan 3 artesanos
    const remainingArtisans = await artisansCollection.find({}).toArray();
    console.log(`📊 Artesanos restantes: ${remainingArtisans.length}`);

    // 3. VERIFICAR estructura final
    const users = await this.getAllUsers();
    const profiles = await this.getAllProfiles();
    const artisans = await this.getAllArtisans();

    console.log('\n🎯 ESTRUCTURA FINAL:');
    console.log(`👤 Usuarios: ${users.length}`);
    console.log(`🖼️  Perfiles: ${profiles.length}`);
    console.log(`🎨 Artesanos: ${artisans.length}`);

    // 4. MOSTRAR RELACIONES
    console.log('\n🔗 RELACIONES ACTUALES:');
    for (const user of users) {
      const profile = profiles.find(p => p.user_id === user.user_id);
      const artisan = artisans.find(a => a.user_id === user.user_id);
      
      console.log(`User ${user.user_id}: ${user.first_name} ${user.last_name}`);
      console.log(`  - Email: ${user.email}`);
      console.log(`  - Es artesano: ${artisan ? 'SÍ 🎨' : 'NO 👤'}`);
      if (artisan) {
        console.log(`  - Biografía: ${artisan.biography.substring(0, 50)}...`);
      }
      console.log('---');
    }

    return {
      message: `Corrección completada. ${changes} cambios realizados.`,
      changes
    };

  } catch (error) {
    console.error('❌ Error en fixDataInconsistency:', error);
    throw new Error(`Failed to fix data inconsistency: ${error}`);
  }
}

// Método adicional para verificar el estado actual
static async checkDataStatus(): Promise<{
  users: number;
  profiles: number; 
  artisans: number;
  inconsistencies: string[];
}> {
  const users = await this.getAllUsers();
  const profiles = await this.getAllProfiles();
  const artisans = await this.getAllArtisans();

  const inconsistencies: string[] = [];

  // Verificar consistencia
  for (const user of users) {
    const profile = profiles.find(p => p.user_id === user.user_id);
    const artisan = artisans.find(a => a.user_id === user.user_id);

    if (!profile) {
      inconsistencies.push(`User ${user.user_id} no tiene perfil`);
    }

    if (profile?.Artisan_Artisan_id && !artisan) {
      inconsistencies.push(`User ${user.user_id} tiene Artisan_Artisan_id pero no existe el artisan`);
    }

    if (artisan && artisan.first_name !== user.first_name) {
      inconsistencies.push(`User ${user.user_id} nombre no coincide con artisan: ${user.first_name} vs ${artisan.first_name}`);
    }
  }

  return {
    users: users.length,
    profiles: profiles.length,
    artisans: artisans.length,
    inconsistencies
  };
}*/
}

