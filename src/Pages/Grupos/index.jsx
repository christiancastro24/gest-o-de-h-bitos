import AsideMenu from "../../Components/AsideMenu";
import { Window } from "../../Components/GlobalStyle/styles";
import { useGroups } from "../../Providers/groups";
import { Container, ContainerGoalsAndAct, ContainerGroup, Loading } from "./styles";
import { ContainerAll } from "../MeusGrupos/styles";
import Pagination from "@material-ui/lab/Pagination";
import { useState } from "react";


const GroupsPage = () => {

    const {
		handleInfo,
		isLoading,
		popUpActGoal,
		setPopUpActGoal,
		groups,
		handleSignIn,
		groupGoalsGroup,
		groupActivitiesGroup,
		setPage,
		totalPages,
	} = useGroups();

    const handleWidth = () => {
        return window.innerWidth > 570 ? 3 : 1;
    }
    const [countPageSize, setCountPageSize] = useState(handleWidth);
    
    window.addEventListener('resize', ()=> {
        setCountPageSize(handleWidth());
    })
    const handleChange = (event, value) => {
		console.log(value);
		setPage(value);
	};
        
            return (
				<>
					<AsideMenu />
					<Window >
						<ContainerAll>
							<h1>Grupos</h1>
							<Pagination
								color="secondary"
								onChange={handleChange}
								defaultPage={1}
								count={totalPages}
								boundaryCount={countPageSize} //2
								siblingCount={1}
							/>

							<Loading visible={isLoading}>Carregando...</Loading>

							{popUpActGoal && (
								<ContainerGoalsAndAct>
									<button
										onClick={() =>
											setPopUpActGoal(!popUpActGoal)
										}
									>
										X
									</button>
									<h1>Metas e Atividades</h1>

									{groupGoalsGroup.length > 0 &&
										groupGoalsGroup[0].goals.map(
											(grou, index) => {
												return (
													<div
														className="group-actv"
														key={index}
													>
														<h4
															style={{
																color: "white",
															}}
														>
															Metas:{" "}
														</h4>
														Título:{" "}
														{grou.title.length > 10
															? grou.title.slice(
																	0,
																	10
															  ) + "..."
															: grou.title}{" "}
														<br />
														Dificuldade:{" "}
														{grou.difficulty
															.length > 10
															? grou.difficulty.slice(
																	0,
																	10
															  ) + "..."
															: grou.difficulty}
														<br />
													</div>
												);
											}
										)}

									{groupActivitiesGroup.length > 0 &&
										groupActivitiesGroup[0].activities.map(
											(grouAtv, index) => {
												return (
													<div
														className="group-actv"
														key={index}
													>
														<h4>Atividades: </h4>
														Título: {
															grouAtv.title
														}{" "}
														<br />
														Tempo de realização:{" "}
														{
															grouAtv.realization_time
														}
														<br />
													</div>
												);
											}
										)}
								</ContainerGoalsAndAct>
							)}

							<Container>
								{/* {isLoading && (
									<h2 style={{ color: "var(--white)" }}>
										Carregando...
									</h2>
								)} */}
								{groups.map((group) => {
									return (
										<ContainerGroup key={group.id}>
											<div className="Items">
												<h2>{group.name}</h2>
												<h3>{group.description}</h3>
												<h3>
													Categoria: {group.category}
												</h3>
											</div>

											<button
												variant="contained"
												onClick={() =>
													handleSignIn(group.id)
												}
											>
												Entrar
											</button>

											<button
												className="btn-info"
												variant="contained"
												onClick={() => {
													setPopUpActGoal(
														!popUpActGoal
													);
													handleInfo(group.id);
												}}
											>
												...
											</button>
										</ContainerGroup>
									);
								})}
							</Container>
						</ContainerAll>
					</Window>
				</>
			);
        }
export default GroupsPage;