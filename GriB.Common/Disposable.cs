using System;

namespace GriB.Common
{
    public class Disposable : IDisposable
    {
        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            
        }

        public void Dispose()
        {
            if (!disposed)
            {
                Dispose(true);
                disposed = true;
            }
            GC.SuppressFinalize(this);
        }
    }
}
