using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using MongoDB.EntityFrameworkCore.Extensions;

namespace CsharpAPI.Data
{
    public class MongoDbContext : DbContext
    {
        public DbSet<RegisterMember> registerMembers { get; set; }
      
        public MongoDbContext(DbContextOptions<MongoDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<RegisterMember>().ToCollection("registerMembers");
        }
    }
}
