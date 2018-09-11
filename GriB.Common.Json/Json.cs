namespace GriB.Common
{
    public static partial class Json
    {
        public static object Parse(string json)
        {
            return new JsonParser(json).Decode();
        }

        public static string Serialize(object obj, SerializeOptions options = null)
        {
            return new JsonSerializer(options).ToJson(obj);
        }
    }
}
