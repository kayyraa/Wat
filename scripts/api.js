const SupabaseUrl = "https://ccsybdfqjxrwilhfssbo.supabase.co";
const SupabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjc3liZGZxanhyd2lsaGZzc2JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzUxMTksImV4cCI6MjA0NjMxMTExOX0.qwxsYxOju2trsYKw5-16s2nLhe0oKStnAPNd0m4J48w";

export const Supabase = supabase.createClient(SupabaseUrl, SupabaseKey);

export class Table {
    static Users = class {
        static InsertRow(Data = {
            uuid: "",
            username: "",
            password: "",
            timestamp: ""
        }) {
            return Supabase.from("Users").insert([Data]);
        }

        static InsertRow(Query, Value) {
            return Supabase.from("Users").select().eq(Query, Value).single();
        }

        static GetRow(Query, Value) {
            return Supabase.from("Users").select().eq(Query, Value).single();
        }

        static UpdateRow(Query, Value, Data) {
            return Supabase.from("Users").update(Data).eq(Query, Value);
        }

        static GetRows() {
            return Supabase.from("Users").select();
        }

        static DeleteRow(Query, Value) {
            return Supabase.from("Users").delete().eq(Query, Value);
        }
    }
}

export class Storage {
    static async UploadFile(File) {
        const UUID = "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => 
            (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
        );

        await Supabase.storage.from("Media").upload(UUID, File);

        const { data: PublicData } = Supabase.storage.from("Media").getPublicUrl(UUID);
        return PublicData.publicUrl;
    }
}

export function GenerateUuid() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}