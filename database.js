// Browser-compatible Supabase client setup.
// Use the official ESM CDN import to work without a bundler.
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

class Database {
    constructor() {
        // Initialize Supabase client
        this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }

    // User Management
    async getUserProfile(userId) {
        const { data, error } = await this.supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (error) throw error;
        return data;
    }

    async createUserProfile(userData) {
        const { data, error } = await this.supabase
            .from('user_profiles')
            .insert([{
                user_id: userData.profile.id,
                username: userData.profile.username,
                name: userData.profile.name,
                avatar: userData.profile.avatar,
                currency: userData.currency,
                stats: userData.stats
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    async updateUserProfile(userId, updates) {
        const { data, error } = await this.supabase
            .from('user_profiles')
            .update(updates)
            .eq('user_id', userId)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    // Inventory Management
    async getUserInventory(userId) {
        const { data, error } = await this.supabase
            .from('user_inventory')
            .select('*')
            .eq('user_id', userId);

        if (error) throw error;
        return data;
    }

    async addInventoryItem(userId, itemId) {
        const { data, error } = await this.supabase
            .from('user_inventory')
            .insert([{
                user_id: userId,
                item_id: itemId,
                obtained_at: new Date().toISOString()
            }]);

        if (error) throw error;
        return data;
    }

    async removeInventoryItem(userId, itemId) {
        const { error } = await this.supabase
            .from('user_inventory')
            .delete()
            .eq('user_id', userId)
            .eq('item_id', itemId);

        if (error) throw error;
    }

    // Admin Functions
    async isAdmin(username) {
        try {
            // Use ILIKE for case-insensitive match
            const { data, error } = await this.supabase
                .from('admins')
                .select('*')
                .ilike('username', username)
                .single();

            if (error) return false;
            return !!data;
        } catch (err) {
            return false;
        }
    }

    async addCurrency(username, amount) {
        const { data: user, error: userError } = await this.supabase
            .from('user_profiles')
            .select('user_id, currency')
            .eq('username', username)
            .single();

        if (userError) throw userError;

        const { error: updateError } = await this.supabase
            .from('user_profiles')
            .update({ currency: user.currency + amount })
            .eq('user_id', user.user_id);

        if (updateError) throw updateError;
    }

    async banUser(username) {
        const { error } = await this.supabase
            .from('user_profiles')
            .update({ banned: true })
            .eq('username', username);

        if (error) throw error;
    }

    // Items Management
    async getAvailableItems() {
        const { data, error } = await this.supabase
            .from('items')
            .select('*');

        if (error) throw error;
        return data;
    }

    async addItem(itemData) {
        const { data, error } = await this.supabase
            .from('items')
            .insert([itemData])
            .select();

        if (error) throw error;
        return data;
    }
}

export const db = new Database();
