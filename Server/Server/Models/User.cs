using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace Server.Models
{
    public partial class User
    {
        public User()
        {
            Votings = new HashSet<Voting>();
        }

        public int IdUser { get; set; }
        public string Email { get; set; }

        [JsonIgnore]
        public string Password { get; set; }

        public virtual ICollection<Voting> Votings { get; set; }
    }
}
