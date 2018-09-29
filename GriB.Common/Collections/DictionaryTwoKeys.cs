using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GriB.Common.Collections
{
    public class DictionaryTwoKeys<T>
    {
        public DictionaryTwoKeys()
        {

        }

        private Dictionary<int, T> intKeys = new Dictionary<int, T>();
        private Dictionary<string, T> stringKeys = new Dictionary<string, T>();

        public T Add(int intKey, string stringKey, T value)
        {
            intKeys.Add(intKey, value);
            stringKeys.Add(stringKey, value);
            return value;
        }

        public T GetValue(int intKey)
        {
            T result;
            if (!intKeys.TryGetValue(intKey, out result))
                result = default(T);
            return result;
        }

        public T GetValue(string stringKey)
        {
            T result;
            if (!stringKeys.TryGetValue(stringKey, out result))
                result = default(T);
            return result;
        }
    }
}
