// GitHub Profile
fetch("https://api.github.com/users/aris321zz")
	.then((res) => res.json())
	.then((data) => {
		document.getElementById("github-card").innerHTML = `
            <img src="${
							data.avatar_url
						}" alt="GitHub" class="w-12 h-12 rounded-full">
            <div>
              <a href="https://github.com/${
								data.login
							}" target="_blank" class="text-primary font-medium">@${
								data.login
							}</a>
              <p class="text-sm text-tertiary">${data.bio || "GitHub User"}</p>
              <p class="text-sm text-gray-400">Repos: ${
								data.public_repos
							} | Followers: ${data.followers}</p>
            </div>
          `;
	});

// Github Project
fetch("https://api.github.com/users/aris321zz/repos?sort=updated")
	.then((res) => res.json())
	.then((repos) => {
		const container = document.getElementById("github-projects");
		const filtered = repos.filter((repo) => !repo.fork).slice(0, 6);

		filtered.forEach((repo) => {
			const branch = repo.default_branch || "main";
			const screenshotURL = `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/${branch}/Screenshot.png`;

			const card = document.createElement("div");
			card.className =
				"card bg-white rounded-xl shadow hover:shadow-lg transition duration-300 flex flex-col";

			card.innerHTML = `
          <img src="${screenshotURL}" 
              alt="Screenshot" 
              class="w-full h-48 object-cover rounded-t-xl"
              onerror="this.onerror=null;console.warn('Screenshot tidak ditemukan:', this.src);this.src='public/image/placeholder.jpg';">
          
          <div class="card-body flex flex-col flex-grow p-4">
            <h4 class="text-lg font-bold text-primary mb-1">${repo.name}</h4>
            <p class="text-xs text-tertiary mb-2">
              ${repo.description || "Tanpa deskripsi."}
            </p>
            <p class="text-sm text-gray-400 mb-3 mt-auto">
              Update terakhir: ${new Date(repo.updated_at).toLocaleDateString(
								"id-ID"
							)}
            </p>
            <div class="flex flex-wrap gap-2 mb-3" id="topics-${
							repo.name
						}"></div>
            <div class="card-footer">
            <a href="${repo.html_url}" 
              target="_blank" 
              class="btn w-full bg-secondary text-white text-sm  rounded text-center hover:opacity-85 ">
              🔗 Lihat di GitHub
            </a>
            </div>
          </div>
        `;

			container.appendChild(card);

			// Ambil topik (butuh fetch tambahan)
			fetch(repo.url + "/topics", {
				headers: { Accept: "application/vnd.github.mercy-preview+json" },
			})
				.then((res) => res.json())
				.then((data) => {
					const topicsContainer = document.getElementById(
						`topics-${repo.name}`
					);
					if (data.names && data.names.length > 0) {
						topicsContainer.innerHTML = data.names
							.map(
								(t) =>
									`<span class="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">${t}</span>`
							)
							.join(" ");
					}
				});
		});
	});
