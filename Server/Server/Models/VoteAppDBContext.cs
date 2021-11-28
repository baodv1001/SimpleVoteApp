using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Server.Models
{
    public partial class VoteAppDBContext : DbContext
    {
        public VoteAppDBContext()
        {
        }

        public VoteAppDBContext(DbContextOptions<VoteAppDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Item> Items { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Voting> Votings { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=.;Database=VoteAppDB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Item>(entity =>
            {
                entity.HasKey(e => e.IdItem)
                    .HasName("PK__Items__AD194268EB5E21A4");

                entity.Property(e => e.IdItem).HasColumnName("idItem");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("description");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("title");

                entity.Property(e => e.Votes)
                    .HasColumnName("votes")
                    .HasDefaultValueSql("((0))");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.IdUser)
                    .HasName("PK__Users__3717C982B036E4BB");

                entity.Property(e => e.IdUser).HasColumnName("idUser");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnType("text")
                    .HasColumnName("password");
            });

            modelBuilder.Entity<Voting>(entity =>
            {
                entity.HasKey(e => e.IdVoting)
                    .HasName("PK__Voting__CB8C9C47BC915015");

                entity.ToTable("Voting");

                entity.Property(e => e.IdVoting).HasColumnName("idVoting");

                entity.Property(e => e.IdItem).HasColumnName("idItem");

                entity.Property(e => e.IdUser).HasColumnName("idUser");

                entity.Property(e => e.VoteDate)
                    .HasColumnType("datetime")
                    .HasColumnName("voteDate");

                entity.HasOne(d => d.IdItemNavigation)
                    .WithMany(p => p.Votings)
                    .HasForeignKey(d => d.IdItem)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Voting__idItem__2A4B4B5E");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.Votings)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Voting__idUser__29572725");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
